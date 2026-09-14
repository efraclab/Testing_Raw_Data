using Dapper;
using Microsoft.Data.SqlClient;
using RawDataWorkSheet.Models;
using RawDataWorkSheet.Models.Requests;

namespace RawDataWorkSheet.Repositories
{
    public class RawDataRepository : IRawDataRepository
    {
        private readonly string _connectionString;

        public RawDataRepository(IConfiguration configuration)
        {
            _connectionString = configuration["Connnectionstrings:Connection1"];
        }

        public async Task<IEnumerable<SampleDetails>> GetSampleDetailsByIdAsync(
            SampleDetailsRequest request)
        {
            var query = @"
SELECT 
    t1.TRN1REFNO AS RegistrationNo,
    ISNULL(t1.TRN1BATCHN, '') AS BatchNo,

    -- Sample details from TRN105
    ISNULL(t1.TRN1PRODALIAS, '') AS SampleName,
    ISNULL(t1.TRN1PRODCD, '') AS SampleCode,

    L.CODEDESC AS Lab,

    p.HEADDESC AS Parameter,
    t2.TRN2HEADER AS ParaCode,

    t2.TRN2METHOD AS MethodName,
    t2.TRN2_METHDO_DTL AS MethodCode,

    CASE 
        WHEN t1.TRN1DATE IS NOT NULL 
        THEN FORMAT(t1.TRN1DATE, 'dd/MM/yyyy') 
        ELSE '' 
    END AS RegistrationDate,

    CASE 
        WHEN t2.TRN2MdateofReport IS NOT NULL
        THEN CONVERT(NVARCHAR(10), t2.TRN2MdateofReport, 103)
        ELSE ''
    END AS MailingDate,

    CASE 
        WHEN t2.Trn2Pardate IS NOT NULL 
        THEN FORMAT(t2.Trn2Pardate, 'dd/MM/yyyy') 
        ELSE '' 
    END AS TatDate,

    CASE 
        WHEN t1.TRN1RECDT IS NOT NULL 
        THEN FORMAT(t1.TRN1RECDT, 'dd/MM/yyyy') 
        ELSE '' 
    END AS RecieptDate,

    CASE 
        WHEN t2.TRN2_ANA_STARTDT IS NOT NULL 
        THEN FORMAT(t2.TRN2_ANA_STARTDT, 'dd/MM/yyyy') 
        ELSE '' 
    END AS AnalysisStartDate,

    CASE 
        WHEN t2.TRN2COMPLETIONDT IS NOT NULL 
        THEN FORMAT(t2.TRN2COMPLETIONDT, 'dd/MM/yyyy') 
        ELSE '' 
    END AS AnalysisCompletionDate,

    CASE 
        WHEN t2.TRN2COMPLETIONDT IS NOT NULL 
             AND t2.TRN2REPODT IS NULL 
            THEN 'Pending from QA End'

        WHEN t2.TRN2REPODT IS NOT NULL 
             AND t2.TRN2MdateofReport IS NULL 
            THEN 'Report not Released'

        WHEN t2.TRN2COMPLETIONDT IS NULL 
            THEN 'Pending from Lab End'

        WHEN t2.TRN2MdateofReport IS NOT NULL 
            THEN 'Report Delivered'

        ELSE ''
    END AS Status

FROM TRN105 t1

INNER JOIN TRN205 t2 
    ON t1.TRN1REFNO = t2.TRN2REFNO

INNER JOIN OHEADMST p 
    ON t2.TRN2HEADER = p.HEADCD

INNER JOIN OCODEMST L 
    ON t2.TRN2DEPARTCD = L.CODECD
    AND L.CODETYPE = 'DM'

WHERE 
    t1.TRN1PLANTCD = 'P001'

    AND t1.TRN1DATE BETWEEN '2025-04-01' AND '2028-03-31'

    AND (
        @RegNo IS NULL
        OR t1.TRN1REFNO = @RegNo
    )

    AND (
        @Lab IS NULL

        OR @Lab LIKE '%Quality Assurance%'

        OR (
            (@Lab LIKE '%Drug%' AND L.CODEDESC LIKE '%Drug%')
            OR (@Lab LIKE '%Micro%' AND L.CODEDESC LIKE '%Micro%')
            OR (@Lab LIKE '%Food%' AND L.CODEDESC LIKE '%Food%')
            OR (@Lab LIKE '%Water%' AND L.CODEDESC LIKE '%Water%')
            OR (@Lab LIKE '%Metal%' AND L.CODEDESC LIKE '%Metal%')
            OR (@Lab LIKE '%Residue%' AND L.CODEDESC LIKE '%Residue%')
            OR (@Lab LIKE '%Environment%' AND L.CODEDESC LIKE '%Environment%')
            OR (@Lab LIKE '%Gas%' AND L.CODEDESC LIKE '%Gas%')
        )
    )

ORDER BY 
    t1.TRN1REFNO,
    L.CODEDESC,
    t2.TRN2HEADER;
";
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<SampleDetails>(
                    query,
                    new
                    {
                        request.RegNo,
                        request.Lab
                    },
                    commandTimeout: 60
                );
            }
        }

        //public async Task<IEnumerable<Columns>> GetColumnsAsync()
        //{
        //    var query = @"
        //        SELECT
        //            ColumnId AS Id,
        //            ColumnName AS Name
        //        FROM COLUMNMASTER
        //    ";

        //    using (var connection = new SqlConnection(_connectionString))
        //    {
        //        int? commandTimeout = 60;

        //        return await connection.QueryAsync<Columns>(
        //            query,
        //            commandTimeout: commandTimeout
        //        );
        //    }
        //}
    }
}