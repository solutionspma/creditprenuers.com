/**
 * ══════════════════════════════════════════════════════════════
 * CREDTEGY - DOCUMENTS ROUTES
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const { authenticate } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const BUSINESS_ID = 'credtegy';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.get('/', authenticate, async (req, res) => {
  try {
    const { contact_id, doc_type } = req.query;
    
    const documents = await prisma.document.findMany({
      where: { 
        business_id: BUSINESS_ID,
        ...(contact_id && { contact_id: parseInt(contact_id) }),
        ...(doc_type && { doc_type }),
      },
      orderBy: { created_at: 'desc' },
      include: { contact: { select: { id: true, name: true } } },
    });
    
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    const { contact_id, doc_type, description } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Upload to Supabase Storage
    const fileName = `${BUSINESS_ID}/${contact_id}/${Date.now()}-${file.originalname}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    // Create document record
    const document = await prisma.document.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id: parseInt(contact_id),
        doc_type,
        file_name: file.originalname,
        file_url: urlData.publicUrl,
        file_size: file.size,
        mime_type: file.mimetype,
        description,
        uploaded_by: req.user.id,
      },
    });

    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id: parseInt(contact_id),
        type: 'document_uploaded',
        description: `Document uploaded: ${file.originalname}`,
        user_id: req.user.id,
      },
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const doc = await prisma.document.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
    });
    
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    await prisma.document.delete({ where: { id: doc.id } });
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

module.exports = router;
