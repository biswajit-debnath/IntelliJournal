import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const demoJournals = [
  {
    content: `Today was an absolutely wonderful day! I woke up feeling refreshed and energized. The sun was shining beautifully, and I decided to go for a morning run in the park. Met up with some old friends for brunch, and we laughed so much our stomachs hurt. Later, I finished that project I've been working on, and my manager loved it! Feeling grateful for all the good things in my life right now. Can't wait to see what tomorrow brings!`,
    analysis: {
      mood: 'happy',
      subject: 'A joyful day filled with exercise, friendship, and professional success',
      summery: 'Had an energizing morning run, enjoyed quality time with friends over brunch, and received positive feedback on a work project. Feeling grateful and optimistic.',
      negative: false,
      color: '#FFD700' // Golden yellow for happiness
    }
  },
  {
    content: `I'm feeling really anxious about the presentation tomorrow. I've been preparing for weeks, but I still don't feel ready. What if I forget everything? What if people ask questions I can't answer? My hands are shaking just thinking about it. I tried to practice in front of the mirror, but it just made me more nervous. I really need this to go well for my career. Can't sleep, mind is racing with all the things that could go wrong.`,
    analysis: {
      mood: 'anxious',
      subject: 'Worry and anxiety about an upcoming work presentation',
      summery: 'Experiencing significant anxiety about an important presentation despite weeks of preparation. Struggling with self-doubt and fear of failure, leading to physical symptoms and insomnia.',
      negative: true,
      color: '#8B7355' // Muted brown for anxiety
    }
  },
  {
    content: `Nothing special happened today. Woke up, went to work, came home. The weather was grey and matched my mood perfectly. I'm not sad, not happy, just... existing. Scrolled through social media for hours but nothing really caught my attention. Ordered takeout because I couldn't be bothered to cook. Watched some TV but can't even remember what it was about. Just another day that blends into all the others. Sometimes I wonder if this is all there is.`,
    analysis: {
      mood: 'apathetic',
      subject: 'A monotonous day filled with indifference and lack of motivation',
      summery: 'Experienced a day of emotional numbness and routine without any notable events. Feeling disconnected and questioning the meaning of daily life.',
      negative: true,
      color: '#808080' // Grey for apathy/neutrality
    }
  },
  {
    content: `Finally achieved something I've been working towards for months! I submitted my thesis today, and it feels like a huge weight has been lifted off my shoulders. I'm so proud of myself for pushing through all the challenges and setbacks. My family is proud too, which means the world to me. Celebrated with a nice dinner and treated myself to that book I've been wanting to read. This is just the beginning of great things to come. I feel accomplished and ready to take on new challenges!`,
    analysis: {
      mood: 'accomplished',
      subject: 'Successfully completing a major academic milestone and feeling proud',
      summery: 'Submitted thesis after months of hard work, feeling relieved and proud. Celebrated with family and personal treats, looking forward to future opportunities with confidence.',
      negative: false,
      color: '#32CD32' // Lime green for accomplishment
    }
  },
  {
    content: `I can't believe they canceled the trip we've been planning for six months. I'm so frustrated and disappointed. We had everything booked and ready to go. Now I have to deal with all the cancellations and trying to get refunds. Plus, I really needed this vacation to destress from work. My friends are upset too, and I feel bad because I was the one who organized everything. Why does this always happen to me? I just want one thing to go according to plan for once.`,
    analysis: {
      mood: 'frustrated',
      subject: 'Disappointment and frustration over a canceled vacation trip',
      summery: 'Dealing with the cancellation of a long-planned trip, feeling frustrated about the logistical hassle and the loss of a much-needed break. Experiencing guilt about disappointing friends.',
      negative: true,
      color: '#DC143C' // Crimson for frustration/anger
    }
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  // Check if we're in development
  if (process.env.NODE_ENV === 'production') {
    console.log('⚠️  Seeding is disabled in production');
    return;
  }

  // Find or create a demo user
  // You'll need to replace this with an actual Clerk user ID from your system
  const demoClerkId = process.env.DEMO_USER_CLERK_ID ;
    if (!demoClerkId) {
        return console.log(`❌ Demo user with Clerk ID not found. Please set the DEMO_USER_CLERK_ID environment variable.`);
    }
  
  let user = await prisma.user.findUnique({
    where: { clerkId: demoClerkId }
  });
  if (!user) {
    return console.log(`❌ Demo user with Clerk ID ${demoClerkId} not found. Please create this user in your development environment before seeding.`);
  }

  // Delete existing demo journals if any
  const existingEntries = await prisma.journalEntry.findMany({
    where: { userId: user.id }
  });

  if (existingEntries.length > 0) {
    console.log(`🗑️  Deleting ${existingEntries.length} existing journal entries...`);
    await prisma.analysis.deleteMany({
      where: {
        entryId: {
          in: existingEntries.map(e => e.id)
        }
      }
    });
    await prisma.journalEntry.deleteMany({
      where: { userId: user.id }
    });
    console.log('✅ Existing entries deleted');
  }

  // Create new demo journals
  console.log('📝 Creating demo journal entries...');
  
  for (let i = 0; i < demoJournals.length; i++) {
    const journal = demoJournals[i];
    
    // Create entries with different dates (spread over the last 5 days)
    const daysAgo = i;
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        content: journal.content,
        createdAt,
        updatedAt: createdAt,
        analysis: {
          create: journal.analysis
        }
      },
      include: {
        analysis: true
      }
    });

    console.log(`✅ Created journal ${i + 1}: ${journal.analysis.mood} (${createdAt.toLocaleDateString()})`);
  }

  console.log('🎉 Seeding completed successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`   - User: ${user.email} (${user.clerkId})`);
  console.log(`   - Journal entries: ${demoJournals.length}`);
  console.log(`   - Moods: happy, anxious, apathetic, accomplished, frustrated`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
