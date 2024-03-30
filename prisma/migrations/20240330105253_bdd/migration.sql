-- CreateTable
CREATE TABLE "Questionnaire" (
    "questionnaireId" SERIAL NOT NULL,
    "DecisionTreeNode" VARCHAR(255) NOT NULL,
    "DecisionTreeNodeResponse" VARCHAR(255) NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("questionnaireId")
);

-- CreateTable
CREATE TABLE "Destionation" (
    "destinationId" SERIAL NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Description" VARCHAR(255) NOT NULL,

    CONSTRAINT "Destionation_pkey" PRIMARY KEY ("destinationId")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "SessionId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("SessionId")
);
