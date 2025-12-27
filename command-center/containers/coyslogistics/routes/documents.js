/**
 * LOGADEMY - DOCUMENTS ROUTES
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const { authenticate } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const BUSINESS_ID = 'logademy';
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', authenticate, async (req, res) => {
  try {
    const { entity_type, entity_id, doc_type } = req.query;
    const documents = await prisma.document.findMany({
      where: { 
        business_id: BUSINESS_ID,
        ...(entity_type && { entity_type }),
        ...(entity_id && { entity_id: parseInt(entity_id) }),
        ...(doc_type && { doc_type }),
      },
      orderBy: { created_at: 'desc' },
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    const { entity_type, entity_id, doc_type, description, expiry_date } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file provided' });

    const fileName = `${BUSINESS_ID}/${entity_type}/${entity_id}/${Date.now()}-${file.originalname}`;
    const { error: uploadError } = await supabase.storage.from('documents').upload(fileName, file.buffer, { contentType: file.mimetype });
    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('documents').getPublicUrl(fileName);

    const document = await prisma.document.create({
      data: {
        business_id: BUSINESS_ID,
        entity_type, // 'driver', 'truck', 'load'
        entity_id: parseInt(entity_id),
        doc_type,
        file_name: file.originalname,
        file_url: urlData.publicUrl,
        file_size: file.size,
        mime_type: file.mimetype,
        description,
        expiry_date: expiry_date ? new Date(expiry_date) : null,
        uploaded_by: req.user.id,
      },
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await prisma.document.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

module.exports = router;
