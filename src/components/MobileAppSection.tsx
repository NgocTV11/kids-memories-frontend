'use client';

import Image from 'next/image';
import { useI18nStore } from '@/store/i18n.store';

export default function MobileAppSection() {
  const { landing: t } = useI18nStore();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📱 {t.mobileApp.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.mobileApp.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left - Mobile Screenshots */}
          <div className="relative">
            <div className="relative z-10 flex justify-center items-center gap-4">
              {/* Phone Mockup */}
              <div className="relative w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-8 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <div className="w-24 h-4 bg-gray-900 rounded-full"></div>
                  </div>
                  
                  {/* App Content Preview */}
                  <div className="p-4 space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">Kids Memories</div>
                      <div className="text-sm text-gray-500">Kỷ niệm tuổi thơ</div>
                    </div>
                    
                    {/* Feature Cards */}
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">👶</div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">Quản lý hồ sơ</div>
                            <div className="text-xs text-gray-500">Thông tin chi tiết</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">📸</div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">Album ảnh</div>
                            <div className="text-xs text-gray-500">Lưu trữ không giới hạn</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">🎂</div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">Cột mốc</div>
                            <div className="text-xs text-gray-500">Theo dõi phát triển</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4">
                      <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                        <div className="text-lg font-bold text-blue-600">12</div>
                        <div className="text-xs text-gray-500">Ảnh</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                        <div className="text-lg font-bold text-purple-600">5</div>
                        <div className="text-xs text-gray-500">Album</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                        <div className="text-lg font-bold text-pink-600">8</div>
                        <div className="text-xs text-gray-500">Cột mốc</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Home Button */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
          </div>

          {/* Right - Features & Download */}
          <div className="space-y-8">
            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                  📱
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t.mobileApp.features[0].title}
                  </h3>
                  <p className="text-gray-600">
                    {t.mobileApp.features[0].description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                  ☁️
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t.mobileApp.features[1].title}
                  </h3>
                  <p className="text-gray-600">
                    {t.mobileApp.features[1].description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t.mobileApp.features[2].title}
                  </h3>
                  <p className="text-gray-600">
                    {t.mobileApp.features[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">{t.mobileApp.downloadTitle}</h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* App Store */}
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg group"
                >
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Tải trên</div>
                    <div className="text-lg font-semibold -mt-1">{t.mobileApp.appStore}</div>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg group"
                >
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Tải trên</div>
                    <div className="text-lg font-semibold -mt-1">{t.mobileApp.googlePlay}</div>
                  </div>
                </a>
              </div>

              {/* QR Code Option */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-4xl">📱</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{t.mobileApp.qrCode}</div>
                    <div className="text-sm text-gray-500">
                      {t.mobileApp.qrCodeDesc}
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  {t.mobileApp.requirements.ios}
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  {t.mobileApp.requirements.android}
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  {t.mobileApp.requirements.free}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
