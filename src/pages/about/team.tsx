import React from 'react';
import Head from 'next/head';

const TeamPage = () => {
  return (
    <Layout> {/* Wrap everything in the main Layout component */}
      <Head>
        <title>Our Team | Baris Charity Foundation</title>
        <meta name="description" content="Meet the team behind Baris Charity Foundation dedicated to making a difference in vulnerable communities." />
      </Head>
      
      <AboutHero />
      
      <AboutLayout currentPath="/about/team">
        <div>
          <h3 className="text-2xl font-semibold text-[#09869a] mb-4">Leadership Team</h3>
          <p className="text-gray-700 mb-6">
            Our dedicated team brings diverse expertise and a shared passion for humanitarian work. Together, we work to implement our vision of empowering vulnerable communities.
          </p>
          
          {/* Team content would go here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team member cards would go here */}
          </div>
        </div>
      </AboutLayout>
    </Layout>
  );
};

export default TeamPage;