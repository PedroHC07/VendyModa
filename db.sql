CREATE DATABASE IF NOT EXISTS vendymoda
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE vendymoda;

CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  disponibilidade ENUM('Em Estoque','Fora de Estoque') NOT NULL DEFAULT 'Em Estoque',
  imagem VARCHAR(255) DEFAULT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, categoria, preco, disponibilidade, imagem) VALUES
('Tênis Esportivo', 'Calçados', 199.90, 'Em Estoque', 'img/Tenis.png'),
('Bolsa de Couro', 'Acessórios', 249.90, 'Em Estoque', 'img/Bolsa.png'),
('Calça Jeans', 'Roupas', 149.90, 'Em Estoque', 'img/Calça.png'),
('Vestido Casual', 'Roupas', 179.90, 'Em Estoque', 'img/Vestido.png'),
('Camisa Social', 'Roupas', 129.90, 'Em Estoque', 'img/Camisa.png');
