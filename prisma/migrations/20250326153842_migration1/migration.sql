-- CreateTable
CREATE TABLE "PreviousToursDetails" (
    "id" BIGSERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "noOfPeople" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "PreviousToursDetails_pkey" PRIMARY KEY ("id")
);
