SELECT 
    P.[ID_CODENTIDADE] AS client_id, 
    P.[PEDOR_RAZAOSOCIAL] AS client_name,
    P.[ID_CODVENDEDOR] AS salesperson_id,
    E.[ENTI_CNPJCPF] AS client_cnpj,
    E.[ENTI_EMAIL] AS client_email,
    E.[ENTI_CELULAR] AS client_cellphone,
    E.[ENTI_FONE] AS client_phone,
    C.[ID_UNIDFEDSIGLA] AS state_code,
    C.[CIDA_NOME] AS city_name,
    E.[ENTI_DDD] AS client_ddd,
    E.[ENTI_DDD_FAX] AS client_fax_ddd,
    E.[ENTI_DDD_CELULAR] AS client_cellphone_ddd
    FROM 
        [PEDIDOORCAMENTO] P
    INNER JOIN 
        [ENTIDADES] E ON P.[ID_CODENTIDADE] = E.[ID_CODENTIDADE]
    INNER JOIN
        [CIDADES] C ON E.[ID_CODCIDADE] = C.[ID_CODCIDADE]
    WHERE 
        P.[PEDOR_DTFATURAMENTO] > GETDATE() - 2
        AND P.[PEDOR_RAZAOSOCIAL] <> 'CLIENTE ESPECIAL'
        AND C.[ID_UNIDFEDSIGLA] <> 'EX'