export interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  donationLink: string;
  urgent?: boolean;
}

export const campaigns: Campaign[] = [
  {
    id: "orphan-support",
    title: "Support Orphan Children",
    description: "Provide food, shelter, education and healthcare for orphaned children in need.",
    image: "/images/campaigns/orphan-support.jpg",
    donationLink: "/programs/education/orphan",
    urgent: true
  },
  {
    id: "clean-water",
    title: "Clean Water Initiative",
    description: "Help us build wells and water systems in communities suffering from water scarcity.",
    image: "/images/campaigns/clean-water.jpg",
    donationLink: "/programs/wash/solar-well"
  },
  {
    id: "food-packages",
    title: "Emergency Food Relief",
    description: "Deliver essential food packages to families facing hunger and food insecurity.",
    image: "/images/campaigns/food-relief.jpg",
    donationLink: "/programs/food/packages",
    urgent: true
  },
  {
    id: "medical-aid",
    title: "Medical Relief Program",
    description: "Provide critical medical supplies and healthcare services to underserved communities.",
    image: "/images/campaigns/medical-aid.jpg",
    donationLink: "/programs/medical/supplies"
  },
  {
    id: "women-empowerment",
    title: "Women's Economic Empowerment",
    description: "Support training and resources for women to develop sustainable livelihoods.",
    image: "/images/campaigns/women-empowerment.jpg",
    donationLink: "/programs/community/women-empowerment"
  },
  {
    id: "education-supplies",
    title: "School Supplies Drive",
    description: "Provide books, stationery and learning materials to students without access to educational resources.",
    image: "/images/campaigns/education-supplies.jpg",
    donationLink: "/programs/education/supplies"
  }
];