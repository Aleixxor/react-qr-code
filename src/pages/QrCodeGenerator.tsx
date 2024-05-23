import { Box, TextField, Button, LinearProgress } from "@mui/material";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { sleep } from "../utils/sleep";
import { saveAs } from "file-saver";

export const QrCodeGeneratorPage = () => {
  const [prefixo, setPrefixo] = useState("Q");
  const [quantidade, setQuantidade] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [currentQrCode, setCurrentQrCode] = useState("");
  const [currentQrCodeText, setCurrentQrCodeText] = useState("");
  const [gerando, setGerando] = useState(false);
  const gerandoRef = useRef(gerando);

  
  const calculaDigitoVerificadorEAN13 = (digitos: number[]): number => {
    // Calcula a soma dos dígitos, alternando o peso entre 3 e 1
    const somaDigitos = digitos.reduce((acc, digit, index) => {
      const weight = index % 2 === 0 ? 3 : 1;
      return acc + (digit * weight);
    }, 0);

    // Calcula o inteiro da divisão da soma por 10, arredondando para baixo, mais 1
    const divisaoSoma = Math.floor(somaDigitos / 10) + 1;

    // Calcula o dígito verificador subtraindo a soma dos dígitos da divisão vezes 10
    const digitoVerificador = (divisaoSoma * 10) - somaDigitos;
    
    return digitoVerificador % 10 == 0 ? 0 : digitoVerificador;
  }

    const validaDigitoVerificadorEAN13 = (numbers: string): boolean => {
      // Converte a string de números em um array de números
      const digitos = numbers.split("").map(Number);
  
      // Obtém o dígito informado
      const digitoVerificadorInformado = digitos[digitos.length - 1];
  
      // Remove o dígito do array de números
      const digitosSemVerificador = digitos.slice(0, -1);
  
      // Calcula o digito verificador correto
      const digitoVerificadorCalculado = calculaDigitoVerificadorEAN13(digitosSemVerificador);
  
      // Verifica se o dígito verificador é igual ao último dígito da sequência
      return digitoVerificadorCalculado === digitoVerificadorInformado;
    };

  const generateQrCode = async (prefixo: string, contador: number) => {
    let text = contador.toString().padStart(`${quantidade}`.length, '0');
    const digitos = text.split("").map(Number);
    const digitoVerificador = calculaDigitoVerificadorEAN13(digitos);
    text += digitoVerificador;
    const textoQR = `${prefixo}-${text}`;
    const url = await QRCode.toDataURL(textoQR);
    saveAs(url, `${textoQR}.jpg`);
    setCurrentQrCodeText(textoQR);
    setCurrentQrCode(url);
  };

  const generateSequentialQrCodes = async (prefixo: string) => {
    for (let contador = 0; gerandoRef.current && contador < quantidade; contador++) {
      setProgresso(((contador + 1) / quantidade) * 100);
      await generateQrCode(prefixo, contador);
      await sleep(100);
    }
    setGerando(false); // Ensure the button state is updated after the loop finishes
    setProgresso(0);
    setCurrentQrCode("");
  };

  useEffect(() => {
    gerandoRef.current = gerando;

    if (gerando) {
      generateSequentialQrCodes(prefixo);
    }
  }, [gerando]);

  return (
    <Box mt={3} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={3}>
      <TextField label="Prefixo" type="text" value={prefixo} onChange={(e) => setPrefixo(e.target.value)} />
      <TextField label="Quantidade" type="number" value={quantidade} onChange={(e) => setQuantidade(parseInt(e.target.value))} />
      <small style={{ color: "gray" }}>Formato do QR Code: {prefixo}-{"0".padStart(`${quantidade}`.length + 1, '0')}</small>
      {gerando ? 
        <Button variant="contained" color="error" onClick={() => setGerando(false)}>Parar de gerar</Button> : 
        <Button variant="contained" color="primary" onClick={() => setGerando(true)}>Gerar QR Codes</Button>
      }
      <LinearProgress sx={{width: "250px"}} variant="determinate" value={progresso} />
      {currentQrCode && (
        <Box mt={2} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={0}>
          <img src={currentQrCode} width={100} height={100} alt="QR Code" />
          <span>
            {currentQrCodeText}
          </span>
        </Box>
      )}
    </Box>
  );
};