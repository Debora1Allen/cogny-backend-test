CREATE VIEW ${schema:raw}.population_sum AS
SELECT 
    SUM((doc_record->>'Population')::int) as total_population
FROM 
    ${schema:raw}.api_data, 
    jsonb_array_elements(doc_record) as doc_record
WHERE 
    (doc_record->>'ID Year')::int IN (2018, 2019, 2020);
