-- CreateTable
CREATE TABLE "Studio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL UNIQUE,
    "price" DECIMAL(10,2) NOT NULL,
    "imageUrl" TEXT,
    "gear" TEXT[],

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);
