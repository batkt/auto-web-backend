import { connectDB } from '../config/mongodb';
import { PageModel } from '../modules/page/page.model';
import mongoose from 'mongoose';
import { SectionModel } from '../modules/section/section.model';

async function main() {
  await connectDB();

  // old data delete
  await PageModel.deleteMany({});
  await SectionModel.deleteMany({});

  const pagesData = [
    {
      slug: 'home',
      name: { en: 'Home', mn: 'Нүүр хуудас' },
      description: { en: 'Main church page', mn: 'Церковын үндсэн хуудас' },
      keywords: ['church', 'home', 'main page', 'worship', 'сүм', 'нүүр хуудас', 'үндсэн хуудас', 'мөргөл'],
    },
    {
      slug: 'about',
      name: { en: 'About', mn: 'Тухай' },
      description: { en: 'About page', mn: 'Тухай хуудас' },
      keywords: ['about', 'church', 'mission', 'vision', 'тухай', 'сүм', 'эрхэм зорилго', 'алсын хараа'],
    },
    {
      slug: 'branches',
      name: { en: 'Branches', mn: 'Салбарууд' },
      description: {
        en: 'Our branches',
        mn: 'Манай сүм нь Улаанбаатар,Дархан, Эрдэнэт хотуудад салбаруудтай бөгөөд нийт 14 салбар тасралтгүй үйл ажиллагаагаа явуулж байна.',
      },
      keywords: ['branch', 'church', 'mission', 'vision', 'салбар', 'сүм', 'дархан', 'эрдэнэт', 'улаанбаатар'],
    },
    {
      slug: 'blog',
      name: { en: 'Blog', mn: 'Блог' },
      description: { en: 'Blog page', mn: 'Блог хуудас' },
      keywords: ['blog', 'church', 'news', 'updates', 'блог', 'сүм', 'мэдээлэл', 'шинэчлэл'],
    },
    {
      slug: 'contact',
      name: { en: 'Contact', mn: 'Холбогдох' },
      description: { en: 'Contact page', mn: 'Холбогдох хуудас' },
      keywords: ['contact', 'church', 'location', 'phone', 'email', 'холбогдох', 'сүм', 'байршил', 'утас', 'имэйл'],
    },
    {
      slug: 'donate',
      name: { en: 'Donate', mn: 'Хандив' },
      description: { en: 'Donate page', mn: 'Хандив хуудас' },
      keywords: ['donate', 'church', 'donation', 'donation page', 'хандив', 'сүм', 'хандив хуудас'],
    },
  ];

  const sectionsData = [
    {
      pageKey: 'home',
      data: [
        {
          key: 'header',
          sortOrder: 1,
          data: {
            logoImage: '',
            menuList: [
              {
                path: '/',
                name: { en: 'Home', mn: 'Нүүр хуудас' },
              },
              {
                path: '/about',
                name: { en: 'About', mn: 'Тухай' },
              },
              {
                path: '/branches',
                name: { en: 'Branches', mn: 'Салбарууд' },
              },
              {
                path: '/donate',
                name: { en: 'Donate', mn: 'Хандив' },
              },
              {
                path: '/blog',
                name: { en: 'Blog', mn: 'Блог' },
              },
              {
                path: '/contact',
                name: { en: 'Contact', mn: 'Холбоо барих' },
              },
            ],
          },
        },
        {
          key: 'home-hero',
          sortOrder: 2,
          data: {
            mainTitle: {
              en: 'Doing Nothing is Not An Option of Our Life',
              mn: 'Юу ч хийхгүй байх нь бидний амьдралын сонголт биш',
            },
            ctaText: {
              en: 'Get Started Today',
              mn: 'Өнөөдөр эхэл',
            },
            ctaUrl: '/get-started',
            backgroundImages: [
              'https://images.unsplash.com/photo-1635247055943-5609b3850b1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1527490087278-9c75be0b8052?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ],
            stats: {
              servedOver: {
                value: 1237865,
                title: {
                  en: 'Served Over',
                  mn: 'Served Over',
                },
                desc: {
                  en: 'Children in 190 countries in the world',
                  mn: 'Дэлхийн 190 оронд хүүхдүүд',
                },
              },
              donate: {
                title: {
                  en: 'Donate Money',
                  mn: 'Хандив өгөх',
                },
                desc: {
                  en: 'Even the all-powerful Pointing has no control about the blind texts.',
                  mn: 'Хүчирхэг Pointing ч сохор текстүүдийг хянах боломжгүй.',
                },
              },
              volunteer: {
                title: {
                  en: 'Be a Volunteer',
                  mn: 'Сайн дурын ажилтан болох',
                },
                desc: {
                  en: 'Even the all-powerful Pointing has no control about the blind texts.',
                  mn: 'Хүчирхэг Pointing ч сохор текстүүдийг хянах боломжгүй.',
                },
              },
            },
          },
        },
        {
          key: 'home-mission',
          sortOrder: 3,
          data: {
            title: {
              en: 'HILLSONG IS A CHURCH THAT BELIEVES IN JESUS, A CHURCH THAT LOVES GOD AND PEOPLE.',
              mn: 'HILLSONG бол Есүст итгэдэг, Бурханыг болон хүмүүсийг хайрладаг чуулган.',
            },
            description: {
              en: "Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for authentic worship, are passionate about the local church, and are on mission to see God's kingdom established across the earth.",
              mn: 'Бид Есүсээс олсон авралын бэлгээр гайхшран, жинхэнэ мөргөлийн сэтгэлтэй, орон нутгийн чуулганыг хайрладаг, Бурханы хаанчлалыг дэлхий даяар тогтоох эрхэм зорилготой.',
            },
          },
        },
        {
          key: 'home-help',
          sortOrder: 4,
          data: {
            title: {
              en: 'How You Can Help',
              mn: 'Та хэрхэн тусалж чадах вэ',
            },
            subtitle: {
              en: 'There are many ways to get involved and make a difference in our community. Choose the path that speaks to your heart and join us in serving others.',
              mn: 'Манай хамт олонд нэгдэж, тусламж хэрэгтэй хүмүүст туслах олон арга зам бий. Таны сэтгэлд нийцсэн замыг сонгон, бидэнтэй хамт үйлчилгээнд нэгдээрэй.',
            },
            items: [
              {
                title: {
                  en: 'Make Donation',
                  mn: 'Хандив өгөх',
                },
                description: {
                  en: 'Support our mission to help those in need. Your generous donations enable us to provide food, shelter, and hope to families in our community and around the world.',
                  mn: 'Тусламж хэрэгтэй хүмүүст туслах бидний эрхэм зорилгыг дэмжээрэй. Таны өгсөн хандив бидэнд хүнс, орон байр, итгэл найдвар түгээх боломж олгодог.',
                },
              },
              {
                title: {
                  en: 'Sponsorship',
                  mn: 'Ивээн тэтгэлэг',
                },
                description: {
                  en: 'Support our mission to help those in need. Your generous donations enable us to provide food, shelter, and hope to families in our community and around the world.',
                  mn: 'Тусламж хэрэгтэй хүмүүст туслах бидний эрхэм зорилгыг дэмжээрэй. Таны өгсөн хандив бидэнд хүнс, орон байр, итгэл найдвар түгээх боломж олгодог.',
                },
              },
              {
                title: {
                  en: 'Community Care',
                  mn: 'Олон нийтийн халамж',
                },
                description: {
                  en: 'Support our mission to help those in need. Your generous donations enable us to provide food, shelter, and hope to families in our community and around the world.',
                  mn: 'Тусламж хэрэгтэй хүмүүст туслах бидний эрхэм зорилгыг дэмжээрэй. Таны өгсөн хандив бидэнд хүнс, орон байр, итгэл найдвар түгээх боломж олгодог.',
                },
              },
            ],
            backgroundImage:
              'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        },
        {
          key: 'home-gallery',
          sortOrder: 5,
          data: {
            title: {
              en: 'Gallery',
              mn: 'Gallery',
            },
            description: {
              en: 'Explore our gallery to see the impact we are making in our community.',
              mn: 'Манай гэр бүлд тавтай морил',
            },
            images: [
              'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1505155485412-30b3a45080ec?q=80&w=1181&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1565843248736-8c41e6db117b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1444840535719-195841cb6e2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1542317785-ae7b6fa20f55?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1584367369853-8b966cf223f4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1548102245-c79dbcfa9f92?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1527490272553-ba05e1f11ee9?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1617080090911-91409e3496ad?q=80&w=1164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1564051741945-452df4e721bc?q=80&w=1161&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1453342664588-b702c83fc822?q=80&w=1159&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1595561579181-263fe6175b73?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ],
          },
        },
        {
          key: 'home-quote',
          sortOrder: 6,
          data: {
            backgroundImage:
              'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            items: [
              {
                quote: {
                  en: 'The best way to find yourself is to lose yourself in the service of others.',
                  mn: 'Хувь хүний хамт олонд байх хамгийн сайн арга бол бүх хүнээр үйлчилэх.',
                },
                author: {
                  en: 'Mahatma Gandhi',
                  mn: 'Махатма Ганди',
                },
              },
              {
                quote: {
                  en: 'The best way to find yourself is to lose yourself in the service of others.',
                  mn: 'Хувь хүний хамт олонд байх хамгийн сайн арга бол бүх хүнээр үйлчилэх.',
                },
                author: {
                  en: 'Michael Chen',
                  mn: 'Махатма Ганди',
                },
              },
              {
                quote: {
                  en: 'The best way to find yourself is to lose yourself in the service of others.',
                  mn: 'Хувь хүний хамт олонд байх хамгийн сайн арга бол бүх хүнээр үйлчилэх.',
                },
                author: {
                  en: 'Jackie Chan',
                  mn: 'Махатма Ганди',
                },
              },
            ],
          },
        },
        {
          key: 'home-blog',
          sortOrder: 7,
          data: {
            title: {
              en: 'Blog',
              mn: 'Blog',
            },
            description: {
              en: 'Explore our blog to see the latest news and updates from our church.',
              mn: 'Манай блогын талаар мэдээлэл авна уу.',
            },
          },
        },
        {
          key: 'footer',
          sortOrder: 8,
          data: {
            description: {
              en: `We are a community of believers dedicated to spreading God's love and serving our neighbors.
              Join us in our mission to make a positive impact in the world.`,
              mn: 'Бид бол Бурханы хайрыг түгээх, хөршүүддээ үйлчлэхэд зориулагдсан итгэгчдийн хамт олон юм. Бидэнтэй нэгдэж, дэлхийд эерэг нөлөө үзүүлэх эрхэм зорилгодоо хамтдаа хүрцгээе.',
            },
            socialMedia: [
              {
                name: 'Facebook',
                url: 'https://www.facebook.com/yourchurch',
              },
              {
                name: 'Instagram',
                url: 'https://www.instagram.com/yourchurch',
              },
              {
                name: 'Youtube',
                url: 'https://www.youtube.com/yourchurch',
              },
            ],
          },
        },
      ],
    },
    {
      pageKey: 'about',
      data: [
        {
          key: 'about-hero',
          sortOrder: 1,
          data: {
            title: {
              en: 'About Us',
              mn: 'Бидний тухай',
            },
            description: {
              en: 'We are a church that believes in Jesus, loves God, and loves people.',
              mn: 'Бид Есүст итгэдэг, Бурханыг болон хүмүүсийг хайрладаг чуулган.',
            },
            image:
              'https://images.unsplash.com/photo-1598283404943-ad25d2b473d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        },
        {
          key: 'about-welcome',
          sortOrder: 2,
          data: {
            title: {
              en: 'Welcome to Our Family',
              mn: 'Манай гэр бүлд тавтай морил',
            },
            description: {
              en: `We are a welcoming Christian community that has been serving our city for over 20 years. Whether you're new to faith or have been walking with God for decades, you'll find a place to belong here. We believe that everyone matters to God, and everyone matters to us.`,
              mn: 'Бид 20 гаруй жилийн турш хотынхаа иргэдэд үйлчлэх, бүх хүнд нээлттэй Христ итгэлийн нийгэмлэг юм. Та итгэлд шинээр ирсэн эсвэл Бурхантай хамт олон жил амьдарч байсан ч энд өөрийн байр суурийг олох болно. Бид Бурханд бүх хүн чухал, бидэнд ч бүх хүн чухал гэдэгт итгэдэг.',
            },
          },
        },
        {
          key: 'about-mission',
          sortOrder: 3,
          data: {
            title: {
              en: 'Our Mission',
              mn: 'Бидний эрхэм зорилгыг',
            },
            description: {
              en: 'Our mission is to share the love of Jesus with our community and the world. We believe that Jesus is the hope of the world and that everyone needs to hear about him.',
              mn: 'Бидэнд бүх хүнээ Христын дуртай болохыг хуваарлах зорилготой. Христын олгомын тухай бүх хүнээ мэдэрэх хэрэгтэй гэдэгт итгэдэг.',
            },
          },
        },
        {
          key: 'about-church-structure',
          sortOrder: 4,
          data: {
            title: {
              en: 'Our Church Structure',
              mn: 'Манай сүмийн бүтэц',
            },
            description: {
              en: `Our church is built on strong leadership and collaborative ministry. Here's how we're organized to serve our community effectively.`,
              mn: 'Манай сүмийн бүтэц',
            },
            image: 'https://www.databridgemarketresearch.com/media/2022/8/MarketscopFranceSightScreensMarket.jpg',
          },
        },
        {
          key: 'about-our-story',
          sortOrder: 5,
          data: {
            title: {
              en: 'Our Story',
              mn: 'Бидний түүх',
            },
            description: {
              en: `What started as a small group of families meeting in a living room has grown into a vibrant community of faith serving thousands across our city. Over the past two decades, we've seen lives changed, families strengthened, and hope restored.

Today, we continue to grow not just in numbers, but in our commitment to serving others and sharing God's love. From our weekly Sunday services to our community outreach programs, everything we do is centered around helping people find their purpose and place in God's family.`,
              mn: 'Бид 20 гаруй жилийн турш хотынхаа иргэдэд үйлчлэх, бүх хүнд нээлттэй Христ итгэлийн нийгэмлэг юм. Та итгэлд шинээр ирсэн эсвэл Бурхантай хамт олон жил амьдарч байсан ч энд өөрийн байр суурийг олох болно. Бид Бурханд бүх хүн чухал, бидэнд ч бүх хүн чухал гэдэгт итгэдэг.',
            },
            items: [
              {
                year: 2003,
                title: {
                  en: 'Humble Beginnings',
                  mn: 'Humble Beginnings',
                },
                description: {
                  en: 'Started as a small group of 12 families meeting in a living room, sharing meals and studying scripture together.',
                  mn: 'Started as a small group of 12 families meeting in a living room, sharing meals and studying scripture together.',
                },
              },
              {
                year: 2007,
                title: {
                  en: 'First Building',
                  mn: 'First Building',
                },
                description: {
                  en: `Moved into our first church building, welcoming 150 members and launching our first children's ministry.`,
                  mn: `Moved into our first church building, welcoming 150 members and launching our first children's ministry.`,
                },
              },
              {
                year: 2012,
                title: {
                  en: 'Community Outreach',
                  mn: 'Community Outreach',
                },
                description: {
                  en: 'Launched our first community outreach programs, including food banks and youth mentorship initiatives.',
                  mn: 'Launched our first community outreach programs, including food banks and youth mentorship initiatives.',
                },
              },
              {
                year: 2020,
                title: {
                  en: 'Digital Innovation',
                  mn: 'Digital Innovation',
                },
                description: {
                  en: 'Adapted to serve our community online, reaching families worldwide and launching virtual small groups.',
                  mn: 'Adapted to serve our community online, reaching families worldwide and launching virtual small groups.',
                },
              },
              {
                year: 2022,
                title: {
                  en: 'Growing Together 2',
                  mn: 'Growing Together 2',
                },
                description: {
                  en: 'Started as a small group of 12 families meeting in a living room, sharing meals and studying scripture together.',
                  mn: 'Started as a small group of 12 families meeting in a living room, sharing meals and studying scripture together.',
                },
              },
              {
                year: 2025,
                title: {
                  en: 'Growing Together 3',
                  mn: 'Growing Together 3',
                },
                description: {
                  en: 'Continuing to grow as a family of faith, serving our city and making a difference in thousands of lives.',
                  mn: 'Continuing to grow as a family of faith, serving our city and making a difference in thousands of lives.',
                },
              },
            ],
          },
        },
        {
          key: 'about-what-we-believe',
          sortOrder: 6,
          data: {
            title: {
              en: 'What We Believe',
              mn: 'Бидний итгэл',
            },
            items: [
              {
                title: {
                  en: "God's Love",
                  mn: "God's Love",
                },
                description: {
                  en: 'We believe that Jesus is the Son of God and the Savior of the world.',
                  mn: 'We believe that Jesus is the Son of God and the Savior of the world.',
                },
              },
              {
                title: {
                  en: 'Service',
                  mn: 'Service',
                },
                description: {
                  en: 'We believe that Jesus is the Son of God and the Savior of the world.',
                  mn: 'We believe that Jesus is the Son of God and the Savior of the world.',
                },
              },
              {
                title: {
                  en: 'Community',
                  mn: 'Community',
                },
                description: {
                  en: 'We believe that Jesus is the Son of God and the Savior of the world.',
                  mn: 'We believe that Jesus is the Son of God and the Savior of the world.',
                },
              },
              {
                title: {
                  en: 'Hope',
                  mn: 'Hope',
                },
                description: {
                  en: 'We believe that Jesus is the Son of God and the Savior of the world.',
                  mn: 'We believe that Jesus is the Son of God and the Savior of the world.',
                },
              },
            ],
          },
        },
        {
          key: 'about-our-community',
          sortOrder: 7,
          data: {
            title: {
              en: 'Our Community',
              mn: 'Our Community',
            },
            description: {
              en: `We are a community of faith that believes in Jesus, loves God, and loves people. We are a community of faith that believes in Jesus, loves God, and loves people.`,
              mn: `We are a community of faith that believes in Jesus, loves God, and loves people. We are a community of faith that believes in Jesus, loves God, and loves people.`,
            },
          },
        },
        {
          key: 'about-map',
          sortOrder: 8,
          data: {
            title: {
              en: 'Find Us on the Map',
              mn: 'Find Us on the Map',
            },
            description: {
              en: `All our campuses are easily accessible and welcome visitors`,
              mn: `All our campuses are easily accessible and welcome visitors`,
            },
            longitude: 106.9167,
            latitude: 47.9167,
          },
        },
      ],
    },
    {
      pageKey: 'branches',
      data: [
        {
          key: 'branch-hero',
          sortOrder: 1,
          data: {
            title: {
              en: 'Find Your Church Home',
              mn: 'Сүмийн байшингаа олоорой',
            },
            description: {
              en: 'We have multiple locations serving different communities across the city. Each campus offers unique ministries while sharing the same mission and values.',
              mn: 'Манай сүм нь Улаанбаатар,Дархан, Эрдэнэт хотуудад салбаруудтай бөгөөд нийт 14 салбар тасралтгүй үйл ажиллагаагаа явуулж байна.',
            },
            image:
              'https://images.unsplash.com/photo-1495582630316-0b481a069ce3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            items: [
              {
                name: {
                  en: 'Campus Locations',
                  mn: 'Салбарууд',
                },
                stats: '6',
              },
              {
                name: {
                  en: 'Weekly Services',
                  mn: '7 хоногын үйл ажиллагаа',
                },
                stats: '15+',
              },
              {
                name: {
                  en: 'Programs',
                  mn: 'Хөтөлбөрүүд',
                },
                stats: '20+',
              },
            ],
          },
        },
        {
          key: 'branch-campus',
          sortOrder: 2,
          data: {
            title: {
              en: 'Choose Your Campus',
              mn: 'Сүмийн салбаруудын байршил',
            },
            description: {
              en: `Find the location that's most convenient for you and your family. Every campus welcomes you with open arms and the same heart for worship.`,
              mn: `Та өөрт ойр байршил олох боломжтой. Манай аль ч салбар таныг хүлээж авахад дуртай байх болно.`,
            },
          },
        },
      ],
    },
    {
      pageKey: 'blog',
      data: [
        {
          key: 'blog-hero',
          sortOrder: 1,
          data: {
            title: {
              en: 'Our Blog',
              mn: 'Нийтлэл',
            },
            description: {
              en: 'Stay connected with our church community through inspiring stories, sermons, and updates.',
              mn: 'Урам зориг өгөх түүх, номлол бүхий нийтлэлүүдээр дамжуулан манай сүмийн нийгэмлэгтэй холбоотой байгаарай.',
            },
            image:
              'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        },
      ],
    },
    {
      pageKey: 'contact',
      data: [
        {
          key: 'contact-hero',
          sortOrder: 1,
          data: {
            title: {
              en: 'Get in Touch',
              mn: 'Холбогдох',
            },
            description: {
              en: 'We would love to hear from you. Reach out to us for any questions, prayer requests, or to learn more about our church community.',
              mn: 'Бид танаас сонсохыг хүсч байна. Асуулт, залбирал, эсвэл манай сүмийн нийгэмлэгийн талаар илүү ихийг мэдэхийн тулд бидэнтэй холбогдоно уу.',
            },
            image:
              'https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        },

        {
          key: 'contact-info',
          sortOrder: 2,
          data: {
            title: {
              en: 'Get in Touch',
              mn: 'Бидэнтэй холбогдох',
            },
            description: {
              en: 'We would love to hear from you. Reach out to us for any questions, prayer requests, or to learn more about our church community.',
              mn: 'Бид танаас сонсохыг хүсч байна. Асуулт, залбирал, эсвэл манай сүмийн нийгэмлэгийн талаар илүү ихийг мэдэхийн тулд бидэнтэй холбогдоно уу.',
            },
            address: {
              en: '123 Main St, Anytown, USA',
              mn: '123 Main St, Anytown, USA',
            },
            phone: '+976 70000000',
            email: 'info@yourchurch.com',
            services: {
              name: {
                en: 'Services',
                mn: 'Хүний бүтээгдэхүүн',
              },
              data: [
                {
                  name: {
                    en: 'Sunday Service',
                    mn: 'Ням гараг',
                  },
                  description: {
                    en: 'Join us every Sunday for our worship service.',
                    mn: 'Ням гараг бүр 10:00 цагт',
                  },
                },
                {
                  name: {
                    en: 'Monday Service',
                    mn: 'Даваа гараг',
                  },
                  description: {
                    en: 'Join us every Sunday for our worship service.',
                    mn: 'Даваа гараг бүр 10:00 цагт',
                  },
                },
              ],
            },
          },
        },
      ],
    },
    {
      pageKey: 'donate',
      data: [
        {
          key: 'donate-hero',
          sortOrder: 1,
          data: {
            title: {
              en: 'Donate',
              mn: 'Хандив',
            },
            description: {
              en: 'Donate to our church to support our mission and vision.',
              mn: 'Манай сүмийн үйл ажиллагаагаа үйлчлүүлэхэд хандив өгөх боломжтой.',
            },
            image:
              'https://images.unsplash.com/photo-1495582630316-0b481a069ce3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        },
        {
          key: 'donate-impact',
          sortOrder: 2,
          data: {
            title: {
              en: 'Where Your Gifts Make an Impact',
              mn: 'Таны өглөг хаана нөлөө үзүүлж байна вэ',
            },
            description: {
              en: `Your faithful giving enables us to serve our community, support missions, and create a place where everyone can encounter God's love. энийг монголруу орчуулаад өг`,
              mn: 'Таны үнэнч сэтгэлээсээ өгсөн өглөг бидэнд олон нийтэд үйлчлэх, номлолыг дэмжих, хүн бүр Бурханы хайрыг мэдэрч болох орон зайг бүтээх боломжийг олгож байна.',
            },
            items: [
              {
                title: {
                  en: 'Community Outreach',
                  mn: 'Олон нийтэд хүрэх үйл ажиллагаа',
                },
                description: {
                  en: 'Supporting local families, food drives, and community programs.',
                  mn: 'Орон нутгийн гэр бүлүүдийг дэмжих, хүнсний хандивын аян, олон нийтийн хөтөлбөрүүдийг хэрэгжүүлэх.',
                },
              },
              {
                title: {
                  en: 'Missions & Ministry',
                  mn: 'Номлол ба Сүмийн үйлчлэл',
                },
                description: {
                  en: `Spreading God's love locally and around the world.`,
                  mn: 'Бурханы хайрыг орон нутаг болон дэлхий даяар түгээх.',
                },
              },
              {
                title: {
                  en: 'Facility & Operations',
                  mn: 'Байр болон Үйл ажиллагаа',
                },
                description: {
                  en: `Maintaining a welcoming space for worship and fellowship.`,
                  mn: 'Тахил өргөх, нөхөрлөлийг дэмжих тав тухтай орчныг хадгалах.',
                },
              },
              {
                title: {
                  en: 'Pastoral Care',
                  mn: 'Пасторын халамж',
                },
                description: {
                  en: `Providing counseling, support, and spiritual guidance.`,
                  mn: 'Сэтгэл зүйн зөвлөгөө, дэмжлэг, сүнслэг удирдамж үзүүлэх.',
                },
              },
            ],
          },
        },
        {
          key: 'donate-payment',
          sortOrder: 3,
          data: {
            title: {
              en: 'Payment',
              mn: 'Хандив',
            },
            description: {
              en: 'Donate to our church to support our mission and vision.',
              mn: 'Манай сүмийн үйл ажиллагаагаа үйлчлүүлэхэд хандив өгөх боломжтой.',
            },
            bankAccount: {
              title: {
                en: 'Bank Account',
                mn: 'Банк хаяг',
              },
              accounts: [
                {
                  bankName: 'Bank of Mongolia',
                  accountNumber: '1234567890',
                  iban: '1234567890',
                  accountName: 'Bank of Mongolia',
                  transferDescription: {
                    en: 'Transfer description',
                    mn: 'Хандив өгөх',
                  },
                },
              ],
            },
            qpay: {
              title: {
                en: 'Qpay',
                mn: 'Qpay',
              },
              description: {
                en: 'Qpay',
                mn: 'Qpay',
              },
              qrCode: 'https://qr.khanbank.mn/qr/1234567890',
            },
            giveInPerson: {
              title: {
                en: 'Give in person',
                mn: 'Хандив өгөх',
              },
              description: {
                en: 'Give in person',
                mn: 'Хандив өгөх',
              },
            },
          },
        },
        {
          key: 'donate-transparency',
          sortOrder: 4,
          data: {
            title: {
              en: 'Financial Transparency',
              mn: 'Ил тод байдал',
            },
            description: {
              en: 'We are committed to being good stewards of your gifts. 90% of donations go directly to ministry and community programs, while 10% covers essential administrative costs. Annual financial reports are available upon request.',
              mn: 'Бид таны ханпивыг хариуцлагатайгаар зарцуулдаг. Хандивын 90% нь шууд сүмийн үйлчлэл болон олон нийтийн хөтөлбөрүүдэд зарцуулагддаг бол 10% нь зайлшгүй шаардлагатай захиргааны зардлыг нөхөхөд зориулагддаг.',
            },
          },
        },
        {
          key: 'donate-thank-you',
          sortOrder: 5,
          data: {
            title: {
              en: 'Thank You for Your Faithfulness',
              mn: 'Таны тусч сэтгэлд баярлалаа',
            },
            description: {
              en: "Your generosity enables us to continue serving our community and sharing God's love. Together, we're making a lasting impact.",
              mn: 'Таны өгөөмөр сэтгэл биднийг олон нийтэд үйлчилж, Бурханы хайрыг түгээсээр байх боломжийг бүрдүүлж байна. Бид хамтдаа удаан хугацаанд үргэлжлэх эерэг нөлөөг бий болгож байна.',
            },
          },
        },
      ],
    },
  ];

  // 1. Create pages
  try {
    const result = await PageModel.insertMany(pagesData, { ordered: false });
    console.log('Inserted pages:', result.length);

    // 2. Create sections
    const pages = await PageModel.find({});
    for (const page of pages) {
      const sectionGroup = sectionsData.find((section) => section.pageKey === page.slug);
      if (sectionGroup && sectionGroup.data?.length > 0) {
        const sectionsToInsert = sectionGroup.data.map((section) => ({
          pageId: page._id,
          key: section.key,
          sortOrder: section.sortOrder,
          data: section.data,
        }));

        const insertedSections = await SectionModel.insertMany(sectionsToInsert, { ordered: false });
        console.log(`Inserted ${insertedSections.length} sections for page: ${page.slug}`);
        // update page with sections
        await PageModel.findByIdAndUpdate(page._id, { sections: insertedSections.map((section) => section._id) });
      }
    }
  } catch (err) {
    console.error('Error inserting data:', err);
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
