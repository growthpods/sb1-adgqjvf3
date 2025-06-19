import { Expert } from './types';

export const executives: Expert[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Product Design Lead",
    company: "Design Co.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rate: 150,
    rating: 4.9,
    nextAvailable: "Tomorrow at 2:00 PM",
    popular: true,
    about: "With over 12 years of experience in product design and UX, I've helped companies like Airbnb, Uber, and Spotify create user-centered digital experiences. I specialize in design systems, user research, and mentoring design teams. My approach combines strategic thinking with hands-on design execution.",
    expertise: [
      "Product Design",
      "UX Strategy",
      "Design Systems",
      "Team Leadership"
    ],
    experience: [
      {
        title: "Product Design Lead",
        company: "Design Co.",
        duration: "2020 - Present"
      },
      {
        title: "Senior Product Designer",
        company: "Airbnb",
        duration: "2017 - 2020"
      },
      {
        title: "Product Designer",
        company: "Uber",
        duration: "2014 - 2017"
      }
    ],
    education: [
      {
        degree: "Master of Design",
        school: "Rhode Island School of Design",
        year: "2014"
      },
      {
        degree: "Bachelor of Fine Arts",
        school: "Parsons School of Design",
        year: "2012"
      }
    ],
    reviews: [
      {
        id: 1,
        author: "Michael Chen",
        role: "Product Manager at Dropbox",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 5,
        date: "2 weeks ago",
        content: "Sarah was incredibly helpful in reviewing our design system and providing actionable feedback. Her experience with large-scale systems was evident, and she helped us identify several critical improvements. The session was well-structured and valuable."
      },
      {
        id: 2,
        author: "Emily Rodriguez",
        role: "UX Designer at Netflix",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 5,
        date: "1 month ago",
        content: "Had an amazing mentoring session with Sarah. She provided clear, practical advice for advancing my career in product design and shared valuable insights from her experience at top tech companies. Highly recommend!"
      }
    ]
  },
  {
    id: 2,
    name: "Alex Thompson",
    title: "Engineering Director",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rate: 200,
    rating: 4.8,
    nextAvailable: "This Friday",
    popular: true,
    about: "Engineering leader with 15+ years of experience scaling teams and systems at companies like Google and Microsoft. I specialize in distributed systems, engineering management, and technical architecture. I help teams solve complex technical challenges while maintaining high-quality standards.",
    expertise: [
      "Engineering Leadership",
      "System Architecture",
      "Team Scaling",
      "Technical Strategy"
    ],
    experience: [
      {
        title: "Engineering Director",
        company: "TechCorp",
        duration: "2019 - Present"
      },
      {
        title: "Senior Engineering Manager",
        company: "Google",
        duration: "2015 - 2019"
      },
      {
        title: "Software Engineer",
        company: "Microsoft",
        duration: "2010 - 2015"
      }
    ],
    education: [
      {
        degree: "MS Computer Science",
        school: "Stanford University",
        year: "2010"
      },
      {
        degree: "BS Computer Engineering",
        school: "MIT",
        year: "2008"
      }
    ],
    reviews: [
      {
        id: 1,
        author: "Lisa Wang",
        role: "CTO at StartupX",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 5,
        date: "1 week ago",
        content: "Alex provided excellent guidance on scaling our engineering team and improving our system architecture. His experience at large tech companies was evident in the practical advice he shared."
      }
    ]
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    title: "Marketing Executive",
    company: "Global Brands Inc.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rate: 175,
    rating: 4.7,
    nextAvailable: "Next Monday",
    popular: false,
    about: "Marketing executive with a proven track record in building global brands and driving digital transformation. I've led successful campaigns for Fortune 500 companies and helped startups establish their market presence.",
    expertise: [
      "Brand Strategy",
      "Digital Marketing",
      "Market Entry",
      "Growth Marketing"
    ],
    experience: [
      {
        title: "Marketing Executive",
        company: "Global Brands Inc.",
        duration: "2018 - Present"
      },
      {
        title: "Marketing Director",
        company: "Tech Startup",
        duration: "2015 - 2018"
      }
    ],
    education: [
      {
        degree: "MBA",
        school: "Harvard Business School",
        year: "2015"
      }
    ],
    reviews: [
      {
        id: 1,
        author: "John Smith",
        role: "Founder at GrowthCo",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 4.7,
        date: "3 weeks ago",
        content: "Maria provided invaluable insights for our marketing strategy. Her experience in both corporate and startup environments was evident in her practical advice."
      }
    ]
  },
  {
    id: 4,
    name: "David Chen",
    title: "CEO",
    company: "Innovation Labs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rate: 300,
    rating: 5.0,
    nextAvailable: "Tomorrow",
    popular: true,
    about: "Serial entrepreneur and technology executive with multiple successful exits. I help founders and executives navigate growth challenges, fundraising, and strategic decisions.",
    expertise: [
      "Startup Strategy",
      "Fundraising",
      "Product Strategy",
      "Leadership"
    ],
    experience: [
      {
        title: "CEO",
        company: "Innovation Labs",
        duration: "2016 - Present"
      },
      {
        title: "Founder",
        company: "TechStart",
        duration: "2010 - 2016"
      }
    ],
    education: [
      {
        degree: "MS Engineering",
        school: "Stanford University",
        year: "2010"
      }
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah Lee",
        role: "CEO at NextGen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 5,
        date: "1 month ago",
        content: "David's strategic insights were game-changing for our business. His experience in scaling startups and navigating complex challenges is unmatched."
      }
    ]
  },
  {
    id: 5,
    name: "Rachel Kim",
    title: "Product Leader",
    company: "Tech Innovators",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rate: 225,
    rating: 4.9,
    nextAvailable: "Next Week",
    popular: false,
    about: "Product leader specializing in AI/ML products and platforms. I help teams build scalable products that solve real user problems while navigating technical complexity.",
    expertise: [
      "Product Management",
      "AI/ML Products",
      "Platform Strategy",
      "Team Building"
    ],
    experience: [
      {
        title: "Product Leader",
        company: "Tech Innovators",
        duration: "2019 - Present"
      },
      {
        title: "Senior PM",
        company: "Amazon",
        duration: "2015 - 2019"
      }
    ],
    education: [
      {
        degree: "MS Computer Science",
        school: "UC Berkeley",
        year: "2015"
      }
    ],
    reviews: [
      {
        id: 1,
        author: "Mike Johnson",
        role: "VP Product",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 4.9,
        date: "2 months ago",
        content: "Rachel's deep understanding of AI/ML product development helped us avoid common pitfalls and accelerate our roadmap."
      }
    ]
  }
]; 