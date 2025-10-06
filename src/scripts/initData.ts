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
      slug: 'blog',
      name: { en: 'Blog', mn: 'Блог' },
      description: { en: 'Blog page', mn: 'Блог хуудас' },
      keywords: ['blog', 'church', 'news', 'updates', 'блог', 'сүм', 'мэдээлэл', 'шинэчлэл'],
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
                path: '#about',
                name: { en: 'About us', mn: 'Бидний тухай' },
              },
              {
                path: '#products',
                name: { en: 'Browse products', mn: 'Бүтээгдэхүүнүүд' },
              },
              {
                path: '#',
                name: { en: 'Home', mn: 'Нүүр хуудас' },
              },
              {
                path: '#reviews',
                name: { en: 'Customer reviews', mn: 'Сэтгэгдлүүд' },
              },
              {
                path: '#stats',
                name: { en: 'Stats', mn: 'Стат' },
              },
              {
                path: '#contact',
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
              en: 'Premium',
              mn: 'Премиум',
            },
            secondaryTitle: {
              en: 'Auto Accessories',
              mn: 'Авто гоёл',
            },
            description:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione officia possimus. Itaque non, consequatur aliquam hic laudantium at laborum.',

            ctaText: {
              en: 'Learn more',
              mn: 'Цааш үзэх ',
            },
            ctaUrl: '/get-started',
            backgroundImage:
              'https://images.unsplash.com/photo-1635247055943-5609b3850b1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            productImage:
              'https://images.unsplash.com/photo-1635247055943-5609b3850b1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        },

        {
          key: 'home-blog',
          sortOrder: 3,
          data: {
            title: {
              en: 'Know About',
              mn: 'Know About',
            },
            secondaryTitle: {
              en: 'Auto Accessories',
              mn: 'Auto Accessories',
            },
            description: {
              en: 'Lorem ipsum is simply dummy text of the printing and typesetting. Lorem Ipsum has been the industry’s standard dummy.',
              mn: '"Lorem ipsum is simply dummy text of the printing and typesetting. Lorem Ipsum has been the industry’s standard dummy.',
            },
            backgroundImage: '',
          },
        },
        {
          key: 'home-products',
          sortOrder: 4,
          data: {
            title: {
              en: 'Accessories',
              mn: 'Accessories',
            },
            secondaryTitle: {
              en: 'Latest Products',
              mn: 'Latest Products',
            },

            items: [
              {
                productImage:
                  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: {
                  en: '',
                  mn: '',
                },
              },
            ],
            backgroundImage:
              'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        },
        {
          key: 'home-stats',
          sortOrder: 5,
          data: {
            backgroundImage: '',
            stats: {
              en: 'Let us show you some stats',
              mn: 'Let us show you some stats',
            },
            title: {
              en: 'Check our numbers over the past few years.',
              mn: 'Check our numbers over the past few years.',
            },

            description: {
              en: 'Explore our gallery to see the impact we are making in our community.',
              mn: 'Манай гэр бүлд тавтай морил',
            },
            items: [
              {
                stat1: '150',
                desc: {
                  en: 'Product Delivered',
                  mn: 'Бараа хүргэгдсэн',
                },
              },
              {
                stat2: '599',
                desc: {
                  en: 'Happy Customers',
                  mn: 'Жаргалтай хэрэглэгчид ',
                },
              },
              {
                stat3: '750',
                desc: {
                  en: 'Product Delivered',
                  mn: 'Бараа хүргэгдсэн',
                },
              },
            ],
          },
        },
        {
          key: 'home-quotes',
          sortOrder: 6,
          data: {
            backgroundImage:
              'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: {
              en: 'Check our numbers over the past few years.',
              mn: 'Check our numbers over the past few years.',
            },
            secondaryTitle: {
              en: 'Auto Accessories',
              mn: 'Авто гоёл',
            },
            item: [
              {
                proName: '',
                proComment: '',
                proImage: '',
              },
            ],
          },
        },
        {
          key: 'home-contact',
          sortOrder: 7,
          data: {
            title: {
              en: 'Blog',
              mn: 'Blog',
            },
            secondaryTitle: {
              en: 'Auto Accessories',
              mn: 'Авто гоёл',
            },
            description: {
              en: 'Explore our blog to see the latest news and updates from our church.',
              mn: 'Манай блогын талаар мэдээлэл авна уу.',
            },
            location: {
              en: 'Auto Accessories',
              mn: 'Авто гоёл',
            },
            address: {
              en: 'Auto Accessories',
              mn: 'Авто гоёл',
            },
            phone: '96470814',
            email: 'hanguri78@gmail.com',
            backgroundImage: '',
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
