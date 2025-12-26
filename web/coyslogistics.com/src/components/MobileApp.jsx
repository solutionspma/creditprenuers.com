export default function MobileApp() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <div className="relative flex justify-center">
            <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
              <div className="w-full h-full bg-gray-100 rounded-[2.5rem] overflow-hidden relative">
                {/* Screen content mockup */}
                <div className="bg-primary-600 text-white p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Coys FieldOps</span>
                    <span className="text-xs">9:41</span>
                  </div>
                  <h3 className="font-bold">Welcome, Driver</h3>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <p className="font-bold text-sm">Load #4521</p>
                        <p className="text-xs text-gray-500">Atlanta → Miami</p>
                      </div>
                      <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🗺️</span>
                      <div>
                        <p className="font-bold text-sm">Route Map</p>
                        <p className="text-xs text-gray-500">ETA: 4h 32m</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💬</span>
                      <div>
                        <p className="font-bold text-sm">Dispatch Chat</p>
                        <p className="text-xs text-gray-500">2 new messages</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <p className="font-bold text-sm">Documents</p>
                        <p className="text-xs text-gray-500">Upload BOL/POD</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom nav mockup */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-2">
                  <div className="flex justify-around">
                    <div className="text-center">
                      <span className="text-xl">🏠</span>
                      <p className="text-xs text-primary-600">Home</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xl">📍</span>
                      <p className="text-xs text-gray-400">Map</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xl">📋</span>
                      <p className="text-xs text-gray-400">Jobs</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xl">⚙️</span>
                      <p className="text-xs text-gray-400">Settings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-1/4 bg-white rounded-lg shadow-lg p-3">
              <p className="text-xs text-gray-500">GPS Status</p>
              <p className="font-bold text-green-600">● Online</p>
            </div>
            <div className="absolute -right-4 top-1/2 bg-white rounded-lg shadow-lg p-3">
              <p className="text-xs text-gray-500">Loads Today</p>
              <p className="font-bold text-primary-600">3 Active</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-block bg-primary-100 text-primary-700 font-bold px-4 py-2 rounded-full mb-6">
              📱 DRIVER APP
            </div>
            <h2 className="section-title mb-6">
              Coys FieldOps Mobile App
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Everything your drivers need in their pocket. Job assignments, GPS tracking, document uploads, and direct dispatch communication — all in one app.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <span>Real-time GPS tracking & route navigation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <span>Load assignments & job details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <span>Document upload (BOL, POD, photos)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <span>Direct chat with dispatch team</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <span>Offline mode for poor signal areas</span>
              </li>
            </ul>

            <div className="flex gap-4">
              <a href="#" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.707 10.708L16.293 9.294 13 12.587V2h-2v10.587l-3.293-3.293-1.414 1.414L12 16.414l5.707-5.706z"/>
                  <path d="M18 18v2H6v-2H4v4h16v-4z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] leading-tight">Download on the</p>
                  <p className="font-bold text-sm">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] leading-tight">GET IT ON</p>
                  <p className="font-bold text-sm">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
