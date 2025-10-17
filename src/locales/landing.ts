import { Locale } from '@/config/i18n.config';

export const landingTranslations = {
  vi: {
    // Navigation
    nav: {
      features: 'Tính năng',
      howItWorks: 'Cách hoạt động',
      pricing: 'Bảng giá',
      about: 'Về chúng tôi',
      login: 'Đăng nhập',
      register: 'Đăng ký',
      getStarted: 'Bắt đầu',
    },

    // Hero Section
    hero: {
      title: 'Lưu giữ mọi khoảnh khắc',
      subtitle: 'quý giá của bé yêu',
      description: 'Nền tảng toàn diện để gia đình chia sẻ, lưu trữ và theo dõi sự phát triển của con yêu. An toàn, riêng tư và đầy yêu thương.',
      cta: 'Bắt đầu miễn phí',
      secondary: 'Xem demo',
      stats: {
        families: 'Gia đình',
        photos: 'Hình ảnh',
        memories: 'Kỷ niệm',
        countries: 'Quốc gia',
      },
    },

    // Slider Section
    slider: {
      title: 'Được tin dùng bởi hàng ngàn gia đình',
      subtitle: 'Khám phá những khoảnh khắc đáng nhớ',
      slides: [
        {
          title: 'Lưu giữ mọi khoảnh khắc đặc biệt',
          description: 'Từ nụ cười đầu tiên đến những bước chân non trẻ, ghi lại tất cả những khoảnh khắc quý giá của con yêu.',
          image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=80',
        },
        {
          title: 'Chia sẻ với cả gia đình',
          description: 'Kết nối ông bà, cô dì chú bác với những khoảnh khắc đáng nhớ của cháu yêu, dù ở bất cứ đâu.',
          image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80',
        },
        {
          title: 'Theo dõi sự phát triển',
          description: 'Ghi nhận từng cột mốc phát triển và xem con bạn lớn lên qua biểu đồ trực quan.',
          image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
        },
        {
          title: 'An toàn và bảo mật',
          description: 'Dữ liệu của bạn được mã hóa và bảo vệ với các tiêu chuẩn bảo mật cao nhất.',
          image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=80',
        },
      ],
    },

    // Features Section
    features: {
      title: 'Tính năng nổi bật',
      subtitle: 'Mọi thứ bạn cần để ghi lại hành trình lớn lên của con',
      items: [
        {
          title: 'Thư viện ảnh không giới hạn',
          description: 'Tải lên và lưu trữ hàng ngàn bức ảnh và video với chất lượng cao. Tự động sắp xếp theo thời gian và album.',
        },
        {
          title: 'Theo dõi sự phát triển',
          description: 'Ghi lại chiều cao, cân nặng và các mốc phát triển quan trọng. Biểu đồ trực quan giúp bạn theo dõi tiến trình.',
        },
        {
          title: 'Chia sẻ với gia đình',
          description: 'Mời ông bà, cô dì chú bác cùng xem và chia sẻ khoảnh khắc. Quyền riêng tư được kiểm soát hoàn toàn.',
        },
        {
          title: 'Timeline & Milestones',
          description: 'Tạo dòng thời gian đẹp mắt với các mốc quan trọng: lần đầu nói, lần đầu đi, sinh nhật và nhiều hơn nữa.',
        },
        {
          title: 'Albums tùy chỉnh',
          description: 'Tạo albums theo chủ đề: sinh nhật, du lịch, ngày lễ. Chia sẻ với từng người hoặc toàn bộ gia đình.',
        },
        {
          title: 'An toàn & Riêng tư',
          description: 'Dữ liệu được mã hóa và bảo mật tuyệt đối. Chỉ những người bạn cho phép mới có thể xem.',
        },
      ],
    },

    // How It Works
    howItWorks: {
      title: 'Cách hoạt động',
      subtitle: 'Chỉ 3 bước đơn giản để bắt đầu',
      steps: [
        {
          title: 'Tạo tài khoản',
          description: 'Đăng ký miễn phí trong 30 giây. Không cần thẻ tín dụng.',
        },
        {
          title: 'Thêm thành viên gia đình',
          description: 'Tạo hồ sơ cho bé và mời các thành viên gia đình tham gia.',
        },
        {
          title: 'Bắt đầu chia sẻ',
          description: 'Tải ảnh, ghi lại khoảnh khắc và theo dõi sự phát triển của con.',
        },
      ],
    },

    // Testimonials
    testimonials: {
      title: 'Gia đình tin tưởng',
      subtitle: 'Hàng nghìn gia đình đã chọn Kids Memories',
      items: [
        {
          name: 'Nguyễn Thị Mai',
          role: 'Mẹ của bé An',
          content: 'Ứng dụng tuyệt vời! Giờ đây ông bà ở quê cũng có thể xem cháu lớn lên từng ngày. Rất an tâm về bảo mật.',
          avatar: '/avatars/user1.jpg',
        },
        {
          name: 'Trần Văn Hùng',
          role: 'Bố của 2 bé',
          content: 'Interface đẹp, dễ sử dụng. Tính năng theo dõi phát triển giúp tôi nhớ đưa con đi khám định kỳ.',
          avatar: '/avatars/user2.jpg',
        },
        {
          name: 'Lê Thu Hằng',
          role: 'Mẹ của bé Minh',
          content: 'Đã dùng nhiều app nhưng Kids Memories là tốt nhất. Albums tự động rất thông minh!',
          avatar: '/avatars/user3.jpg',
        },
      ],
    },

    // Pricing
    pricing: {
      title: 'Bảng giá đơn giản',
      subtitle: 'Chọn gói phù hợp với nhu cầu của bạn',
      monthly: 'Tháng',
      yearly: 'Năm',
      save: 'Tiết kiệm {percent}%',
      plans: [
        {
          name: 'Miễn phí',
          price: '0',
          currency: 'VNĐ',
          period: 'mãi mãi',
          description: 'Dùng thử các tính năng cơ bản',
          features: [
            '1 gia đình',
            'Tối đa 2 bé',
            '500 MB lưu trữ',
            '3 albums',
            'Chia sẻ cơ bản',
          ],
          cta: 'Bắt đầu miễn phí',
          popular: false,
        },
        {
          name: 'Premium',
          price: '99.000',
          currency: 'VNĐ',
          period: 'tháng',
          description: 'Cho gia đình đang phát triển',
          features: [
            '1 gia đình',
            'Không giới hạn số bé',
            '50 GB lưu trữ',
            'Không giới hạn albums',
            'Chia sẻ nâng cao',
            'Biểu đồ phát triển',
            'Tải xuống chất lượng cao',
          ],
          cta: 'Chọn Premium',
          popular: true,
        },
        {
          name: 'Family',
          price: '199.000',
          currency: 'VNĐ',
          period: 'tháng',
          description: 'Cho đại gia đình',
          features: [
            'Nhiều gia đình',
            'Không giới hạn số bé',
            '200 GB lưu trữ',
            'Không giới hạn albums',
            'Chia sẻ không giới hạn',
            'Biểu đồ nâng cao',
            'Hỗ trợ ưu tiên',
            'Sao lưu tự động',
          ],
          cta: 'Chọn Family',
          popular: false,
        },
      ],
    },

    // CTA Section
    cta: {
      title: 'Sẵn sàng bắt đầu?',
      subtitle: 'Tham gia cùng hàng nghìn gia đình đang lưu giữ kỷ niệm đẹp',
      button: 'Tạo tài khoản miễn phí',
      note: 'Không cần thẻ tín dụng',
    },

    // Footer
    footer: {
      tagline: 'Lưu giữ khoảnh khắc quý giá',
      product: 'Sản phẩm',
      features: 'Tính năng',
      pricing: 'Bảng giá',
      download: 'Tải ứng dụng',
      company: 'Công ty',
      about: 'Về chúng tôi',
      blog: 'Blog',
      careers: 'Tuyển dụng',
      contact: 'Liên hệ',
      support: 'Hỗ trợ',
      help: 'Trợ giúp',
      privacy: 'Chính sách bảo mật',
      terms: 'Điều khoản sử dụng',
      faq: 'Câu hỏi thường gặp',
      social: 'Mạng xã hội',
      copyright: '© 2025 Kids Memories. Bảo lưu mọi quyền.',
    },
  },

  en: {
    // Navigation
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      about: 'About',
      login: 'Login',
      register: 'Sign Up',
      getStarted: 'Get Started',
    },

    // Hero Section
    hero: {
      title: 'Capture every precious',
      subtitle: 'moment of your little ones',
      description: 'The comprehensive platform for families to share, store, and track your children\'s growth. Safe, private, and full of love.',
      cta: 'Start Free',
      secondary: 'Watch Demo',
      stats: {
        families: 'Families',
        photos: 'Photos',
        memories: 'Memories',
        countries: 'Countries',
      },
    },

    // Slider Section
    slider: {
      title: 'Trusted by thousands of families',
      subtitle: 'Discover memorable moments',
      slides: [
        {
          title: 'Preserve every special moment',
          description: 'From the first smile to those wobbly first steps, capture all of your child\'s precious moments.',
          image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=80',
        },
        {
          title: 'Share with the whole family',
          description: 'Connect grandparents, aunts, and uncles with your child\'s memorable moments, no matter where they are.',
          image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80',
        },
        {
          title: 'Track development',
          description: 'Record each developmental milestone and watch your child grow through visual charts.',
          image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
        },
        {
          title: 'Safe and secure',
          description: 'Your data is encrypted and protected with the highest security standards.',
          image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=80',
        },
      ],
    },

    // Features Section
    features: {
      title: 'Key Features',
      subtitle: 'Everything you need to document your child\'s journey',
      items: [
        {
          title: 'Unlimited Photo Library',
          description: 'Upload and store thousands of high-quality photos and videos. Auto-organized by time and albums.',
        },
        {
          title: 'Growth Tracking',
          description: 'Record height, weight, and important developmental milestones. Visual charts help you track progress.',
        },
        {
          title: 'Family Sharing',
          description: 'Invite grandparents, aunts, uncles to view and share moments. Complete privacy control.',
        },
        {
          title: 'Timeline & Milestones',
          description: 'Create beautiful timelines with important milestones: first words, first steps, birthdays, and more.',
        },
        {
          title: 'Custom Albums',
          description: 'Create themed albums: birthdays, trips, holidays. Share with specific people or entire family.',
        },
        {
          title: 'Safe & Private',
          description: 'Data is encrypted and absolutely secure. Only people you allow can view.',
        },
      ],
    },

    // How It Works
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Just 3 simple steps to get started',
      steps: [
        {
          title: 'Create Account',
          description: 'Sign up free in 30 seconds. No credit card required.',
        },
        {
          title: 'Add Family Members',
          description: 'Create profiles for your kids and invite family members to join.',
        },
        {
          title: 'Start Sharing',
          description: 'Upload photos, record moments, and track your child\'s development.',
        },
      ],
    },

    // Testimonials
    testimonials: {
      title: 'Trusted by Families',
      subtitle: 'Thousands of families have chosen Kids Memories',
      items: [
        {
          name: 'Sarah Johnson',
          role: 'Mom of Emma',
          content: 'Amazing app! Now grandparents can watch their grandchild grow every day. Very confident about security.',
          avatar: '/avatars/user1.jpg',
        },
        {
          name: 'Michael Chen',
          role: 'Dad of 2 kids',
          content: 'Beautiful interface, easy to use. Growth tracking helps me remember regular checkups.',
          avatar: '/avatars/user2.jpg',
        },
        {
          name: 'Lisa Anderson',
          role: 'Mom of baby',
          content: 'Used many apps but Kids Memories is the best. Auto albums are so smart!',
          avatar: '/avatars/user3.jpg',
        },
      ],
    },

    // Pricing
    pricing: {
      title: 'Simple Pricing',
      subtitle: 'Choose the plan that fits your needs',
      monthly: 'Monthly',
      yearly: 'Yearly',
      save: 'Save {percent}%',
      plans: [
        {
          name: 'Free',
          price: '0',
          currency: 'USD',
          period: 'forever',
          description: 'Try basic features',
          features: [
            '1 family',
            'Up to 2 kids',
            '500 MB storage',
            '3 albums',
            'Basic sharing',
          ],
          cta: 'Start Free',
          popular: false,
        },
        {
          name: 'Premium',
          price: '3.99',
          currency: 'USD',
          period: 'month',
          description: 'For growing families',
          features: [
            '1 family',
            'Unlimited kids',
            '50 GB storage',
            'Unlimited albums',
            'Advanced sharing',
            'Growth charts',
            'HD downloads',
          ],
          cta: 'Choose Premium',
          popular: true,
        },
        {
          name: 'Family',
          price: '7.99',
          currency: 'USD',
          period: 'month',
          description: 'For extended families',
          features: [
            'Multiple families',
            'Unlimited kids',
            '200 GB storage',
            'Unlimited albums',
            'Unlimited sharing',
            'Advanced charts',
            'Priority support',
            'Auto backup',
          ],
          cta: 'Choose Family',
          popular: false,
        },
      ],
    },

    // CTA Section
    cta: {
      title: 'Ready to get started?',
      subtitle: 'Join thousands of families preserving beautiful memories',
      button: 'Create Free Account',
      note: 'No credit card required',
    },

    // Footer
    footer: {
      tagline: 'Preserve precious moments',
      product: 'Product',
      features: 'Features',
      pricing: 'Pricing',
      download: 'Download App',
      company: 'Company',
      about: 'About Us',
      blog: 'Blog',
      careers: 'Careers',
      contact: 'Contact',
      support: 'Support',
      help: 'Help Center',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      faq: 'FAQ',
      social: 'Social',
      copyright: '© 2025 Kids Memories. All rights reserved.',
    },
  },

  ja: {
    // Navigation
    nav: {
      features: '機能',
      howItWorks: '使い方',
      pricing: '料金',
      about: '私たちについて',
      login: 'ログイン',
      register: '登録',
      getStarted: '始める',
    },

    // Hero Section
    hero: {
      title: 'お子様の大切な',
      subtitle: '瞬間をすべて記録',
      description: '家族で共有、保存、お子様の成長を追跡する総合プラットフォーム。安全でプライベート、愛情いっぱい。',
      cta: '無料で始める',
      secondary: 'デモを見る',
      stats: {
        families: '家族',
        photos: '写真',
        memories: '思い出',
        countries: 'カ国',
      },
    },

    // Slider Section
    slider: {
      title: '何千もの家族に信頼されています',
      subtitle: '思い出に残る瞬間を発見',
      slides: [
        {
          title: '特別な瞬間をすべて保存',
          description: '初めての笑顔からよちよち歩きまで、お子様の大切な瞬間をすべて記録します。',
          image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=80',
        },
        {
          title: '家族全員で共有',
          description: '祖父母や親戚と、どこにいてもお子様の思い出の瞬間を共有できます。',
          image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80',
        },
        {
          title: '成長を追跡',
          description: '各発達マイルストーンを記録し、視覚的なチャートでお子様の成長を見守ります。',
          image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
        },
        {
          title: '安全で安心',
          description: 'お客様のデータは暗号化され、最高のセキュリティ基準で保護されています。',
          image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=80',
        },
      ],
    },

    // Features Section
    features: {
      title: '主な機能',
      subtitle: 'お子様の成長記録に必要なすべて',
      items: [
        {
          title: '無制限フォトライブラリ',
          description: '高品質の写真とビデオを何千枚もアップロード・保存。時間とアルバムで自動整理。',
        },
        {
          title: '成長記録',
          description: '身長、体重、重要な発達のマイルストーンを記録。視覚的なチャートで進捗を追跡。',
        },
        {
          title: '家族との共有',
          description: '祖父母、おじ、おばを招待して瞬間を見て共有。プライバシーは完全に制御。',
        },
        {
          title: 'タイムライン＆マイルストーン',
          description: '美しいタイムラインを作成：初めての言葉、初めての一歩、誕生日など重要な瞬間。',
        },
        {
          title: 'カスタムアルバム',
          description: 'テーマ別アルバム作成：誕生日、旅行、休日。特定の人または家族全員と共有。',
        },
        {
          title: '安全＆プライベート',
          description: 'データは暗号化され完全に安全。許可した人だけが閲覧可能。',
        },
      ],
    },

    // How It Works
    howItWorks: {
      title: '使い方',
      subtitle: 'たった3つの簡単なステップで開始',
      steps: [
        {
          title: 'アカウント作成',
          description: '30秒で無料登録。クレジットカード不要。',
        },
        {
          title: '家族メンバーを追加',
          description: 'お子様のプロフィールを作成し、家族を招待。',
        },
        {
          title: '共有開始',
          description: '写真をアップロード、瞬間を記録、お子様の発達を追跡。',
        },
      ],
    },

    // Testimonials
    testimonials: {
      title: '家族に信頼されています',
      subtitle: '何千もの家族がKids Memoriesを選んでいます',
      items: [
        {
          name: '田中 美咲',
          role: 'えまちゃんのママ',
          content: '素晴らしいアプリ！今では祖父母も孫の成長を毎日見ることができます。セキュリティも安心。',
          avatar: '/avatars/user1.jpg',
        },
        {
          name: '佐藤 健',
          role: '2人の子供のパパ',
          content: '美しいインターフェース、使いやすい。成長記録のおかげで定期検診を忘れません。',
          avatar: '/avatars/user2.jpg',
        },
        {
          name: '鈴木 花子',
          role: '赤ちゃんのママ',
          content: '多くのアプリを使いましたがKids Memoriesが最高。自動アルバムがとても賢い！',
          avatar: '/avatars/user3.jpg',
        },
      ],
    },

    // Pricing
    pricing: {
      title: 'シンプルな料金',
      subtitle: 'ニーズに合ったプランを選択',
      monthly: '月額',
      yearly: '年額',
      save: '{percent}%お得',
      plans: [
        {
          name: '無料',
          price: '0',
          currency: '円',
          period: '永久',
          description: '基本機能をお試し',
          features: [
            '1家族',
            '最大2人の子供',
            '500 MBストレージ',
            '3つのアルバム',
            '基本共有',
          ],
          cta: '無料で始める',
          popular: false,
        },
        {
          name: 'プレミアム',
          price: '500',
          currency: '円',
          period: '月',
          description: '成長中の家族向け',
          features: [
            '1家族',
            '無制限の子供',
            '50 GBストレージ',
            '無制限アルバム',
            '高度な共有',
            '成長チャート',
            'HD ダウンロード',
          ],
          cta: 'プレミアムを選択',
          popular: true,
        },
        {
          name: 'ファミリー',
          price: '1,000',
          currency: '円',
          period: '月',
          description: '大家族向け',
          features: [
            '複数の家族',
            '無制限の子供',
            '200 GBストレージ',
            '無制限アルバム',
            '無制限共有',
            '高度なチャート',
            '優先サポート',
            '自動バックアップ',
          ],
          cta: 'ファミリーを選択',
          popular: false,
        },
      ],
    },

    // CTA Section
    cta: {
      title: '始める準備はできましたか？',
      subtitle: '美しい思い出を保存している何千もの家族に参加',
      button: '無料アカウント作成',
      note: 'クレジットカード不要',
    },

    // Footer
    footer: {
      tagline: '大切な瞬間を保存',
      product: '製品',
      features: '機能',
      pricing: '料金',
      download: 'アプリをダウンロード',
      company: '会社',
      about: '私たちについて',
      blog: 'ブログ',
      careers: '採用情報',
      contact: 'お問い合わせ',
      support: 'サポート',
      help: 'ヘルプセンター',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      faq: 'よくある質問',
      social: 'ソーシャル',
      copyright: '© 2025 Kids Memories. All rights reserved.',
    },
  },
};

export const getLandingTranslation = (locale: Locale) => landingTranslations[locale];
