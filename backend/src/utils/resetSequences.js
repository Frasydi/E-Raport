const prisma = require("../../prisma/prismaClient");

/**
 * Reset auto-increment sequences for specified tables in a database-agnostic way
 * @param {Array<{tableName: string, sequenceColumn: string}>} tables - Array of table configurations
 */
async function resetSequences(tables) {
    // Get database provider from Prisma datasource
    const dbProvider = prisma._dmmf?.datasource?.provider || process.env.DATABASE_PROVIDER;
    
    for (const { tableName, sequenceColumn } of tables) {
        try {
            if (dbProvider === 'postgresql') {
                // PostgreSQL uses sequences
                const sequenceName = `${tableName}_${sequenceColumn}_seq`;
                await prisma.$executeRawUnsafe(`ALTER SEQUENCE "${sequenceName}" RESTART WITH 1;`);
                console.log(`✅ Reset PostgreSQL sequence for ${tableName}.${sequenceColumn}`);
            } else if (dbProvider === 'mysql') {
                // MySQL uses AUTO_INCREMENT
                await prisma.$executeRawUnsafe(`ALTER TABLE ${tableName} AUTO_INCREMENT = 1`);
                console.log(`✅ Reset MySQL auto_increment for ${tableName}`);
            } else {
                // For unknown providers, skip sequence reset with warning
                console.warn(`⚠️ Unknown database provider '${dbProvider}'. Skipping sequence reset for ${tableName}.`);
            }
        } catch (error) {
            // Log warning but don't throw - sequence reset is optional
            console.warn(`⚠️ Could not reset sequence for ${tableName}.${sequenceColumn}:`, error.message);
        }
    }
}

/**
 * Reset sequence for ProfilSekolah table
 */
async function resetProfilSekolahSequence() {
    await resetSequences([
        { tableName: 'ProfilSekolah', sequenceColumn: 'id_profil_sekolah' }
    ]);
}

/**
 * Reset sequences for Kategori-related tables
 */
async function resetKategoriSequences() {
    await resetSequences([
        { tableName: 'Kategori', sequenceColumn: 'id_kategori' },
        { tableName: 'SubKategori', sequenceColumn: 'id_sub_kategori' },
        { tableName: 'Indikator', sequenceColumn: 'id_indikator' }
    ]);
}

module.exports = {
    resetSequences,
    resetProfilSekolahSequence,
    resetKategoriSequences
};