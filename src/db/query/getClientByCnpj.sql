SELECT TOP(1)
[ID_CODENTIDADE] AS client_id,
[ENTI_RAZAOSOCIAL] AS corporate_name,
[ENTI_CNPJCPF] as client_cnpj,
[ID_CODVENDEDOR] AS salesperson_id
FROM [ENTIDADES]
WHERE [ENTI_CNPJCPF] = @cnpj