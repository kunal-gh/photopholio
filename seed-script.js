const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const placeholderData = require('./src/lib/placeholder-images.json');

async function main() {
  try {
    console.log("Wiping database...");
    await prisma.photograph.deleteMany({});
    await prisma.section.deleteMany({});

    console.log("Creating categories...");
    const categories = Array.from(new Set(placeholderData.placeholderImages.map(img => {
      if (img.id.includes("wedding")) return "Wedding";
      if (img.id.includes("portrait")) return "Portrait";
      if (img.id.includes("event")) return "Events";
      if (img.id.includes("fashion")) return "Fashion";
      if (img.id.includes("concert")) return "Concerts";
      if (img.id.includes("street")) return "Street";
      if (img.id.includes("ai")) return "AI Art";
      return "General";
    })));

    for (const [index, catName] of categories.entries()) {
      await prisma.section.create({
        data: {
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, '-'),
          description: `Beautiful ${catName.toLowerCase()} photography series.`,
          order: index
        }
      });
    }

    console.log("Creating photos...");
    for (const img of placeholderData.placeholderImages) {
      let sectionName = "General";
      if (img.id.includes("wedding")) sectionName = "Wedding";
      if (img.id.includes("portrait")) sectionName = "Portrait";
      if (img.id.includes("event")) sectionName = "Events";
      if (img.id.includes("fashion")) sectionName = "Fashion";
      if (img.id.includes("concert")) sectionName = "Concerts";
      if (img.id.includes("street")) sectionName = "Street";
      if (img.id.includes("ai")) sectionName = "AI Art";

      await prisma.photograph.create({
        data: {
          title: img.imageHint.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          description: img.description,
          section: sectionName,
          imageUrl: img.imageUrl,
          imageKitFileId: img.id,
          featured: Math.random() > 0.7
        }
      });
    }

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
