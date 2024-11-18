from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Inicialização do navegador
driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

# Função para acessar a página
def acessar_pagina(url):
    driver.get(url)
    time.sleep(1)

# Função para cadastrar um usuário
def cadastrar_usuario(nome, senha, telefone, cargo, botao_salvar):
    try:
        wait.until(EC.visibility_of_element_located((By.ID, nome))).send_keys("Usuário Teste")
        time.sleep(1)
        
        wait.until(EC.visibility_of_element_located((By.ID, senha))).send_keys("senha123")
        time.sleep(1)
        
        wait.until(EC.visibility_of_element_located((By.ID, telefone))).send_keys("123456789")
        time.sleep(1)
        
        wait.until(EC.visibility_of_element_located((By.ID, cargo))).send_keys("Cargo Teste")
        time.sleep(1)
        
        wait.until(EC.element_to_be_clickable((By.ID, botao_salvar))).click()
        time.sleep(1)
    except Exception as e:
        print("Erro ao cadastrar usuário:", e)

# Função para consultar usuário por nome
def consultar_usuario_por_nome(campo_consulta_nome, nome_existente, nome_inexistente=None):
    try:
        campo_nome = wait.until(EC.visibility_of_element_located((By.ID, campo_consulta_nome)))
        
        if nome_existente:
            campo_nome.send_keys(nome_existente)
            time.sleep(1)
            print(f"Consultando usuário existente pelo nome: {nome_existente}")
            campo_nome.clear()
            time.sleep(1)
        
        if nome_inexistente:
            campo_nome.send_keys(nome_inexistente)
            time.sleep(1)
            print(f"Consultando usuário inexistente pelo nome: {nome_inexistente}")
            campo_nome.clear()
            time.sleep(1)
    except Exception as e:
        print("Erro ao consultar usuário pelo nome:", e)

# Função para consultar usuário por cargo
def consultar_usuario_por_cargo(campo_consulta_cargo, cargo_existente, cargo_inexistente=None):
    try:
        campo_cargo = wait.until(EC.visibility_of_element_located((By.ID, campo_consulta_cargo)))
        
        if cargo_existente:
            campo_cargo.send_keys(cargo_existente)
            time.sleep(1)
            print(f"Consultando usuário existente pelo cargo: {cargo_existente}")
            campo_cargo.clear()
            time.sleep(1)
        
        if cargo_inexistente:
            campo_cargo.send_keys(cargo_inexistente)
            time.sleep(1)
            print(f"Consultando usuário inexistente pelo cargo: {cargo_inexistente}")
            campo_cargo.clear()
            time.sleep(1)
    except Exception as e:
        print("Erro ao consultar usuário pelo cargo:", e)

# Função para editar um usuário
def editar_usuario(nome, senha, telefone, cargo, botao_editar_classe, botao_salvar):
    try:
        botao_editar = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, botao_editar_classe)))
        botao_editar.click()
        time.sleep(1)
        
        wait.until(EC.visibility_of_element_located((By.ID, nome))).clear()
        wait.until(EC.visibility_of_element_located((By.ID, nome))).send_keys("Usuário Editado")
        time.sleep(1)
        
        wait.until(EC.visibility_of_element_located((By.ID, senha))).clear()
        wait.until(EC.visibility_of_element_located((By.ID, senha))).send_keys("novasenha123")
        time.sleep(1)
        
        wait.until(EC.visibility_of_element_located((By.ID, telefone))).clear()
        wait.until(EC.visibility_of_element_located((By.ID, telefone))).send_keys("987654321")
        time.sleep(1)
        
        wait.until(EC.visibility_of_element_located((By.ID, cargo))).clear()
        wait.until(EC.visibility_of_element_located((By.ID, cargo))).send_keys("Cargo Editado")
        time.sleep(1)
        
        wait.until(EC.element_to_be_clickable((By.ID, botao_salvar))).click()
        time.sleep(1)
        print("Usuário editado com sucesso.")
    except Exception as e:
        print("Erro ao editar usuário:", e)

# Função para excluir um usuário
def excluir_usuario(botao_excluir_classe):
    try:
        # Localizar o botão de exclusão usando a classe
        botao_excluir = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, botao_excluir_classe)))
        botao_excluir.click()
        time.sleep(1)
        print("Usuário excluído com sucesso.")
    except Exception as e:
        print("Erro ao excluir usuário:", e)

# Exemplo de uso
if __name__ == "__main__":
    acessar_pagina("http://127.0.0.1:5501/index%20copy%202.html")
    
    # Cadastro de 1 usuário para o teste
    cadastrar_usuario("name", "cpf", "phone", "position", "submit-btn")

    # Editar o usuário cadastrado
    editar_usuario("name", "cpf", "phone", "position", "edit-btn", "submit-btn")

    # Consultar usuário pelo nome após a edição (correto e incorreto)
    consultar_usuario_por_nome("search-name", "Usuário Editado", "Nome Inexistente")

    # Consultar usuário pelo cargo após a edição (correto e incorreto)
    consultar_usuario_por_cargo("search-position", "Cargo Editado", "Cargo Inexistente")

    # Consultar novamente pelo nome apenas com o correto
    consultar_usuario_por_nome("search-name", "Usuário Editado")

    # Excluir o usuário usando a classe do botão de exclusão
    excluir_usuario("delete-btn")

    # Fecha o navegador após os testes
    time.sleep(1)
    driver.quit()
