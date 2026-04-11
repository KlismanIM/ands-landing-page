
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if(targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (window.innerWidth < 768) {
                            Alpine.store('app', { isMenuOpen: false });
                        }
                    }
                });
            });
            
            // Initialize AOS after page load
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        });


// Form submission com Formspree
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    // Mostra o spinner
    const submitBtn = document.getElementById("submitBtn");
    const submitText = document.getElementById("submitText");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const form = e.target;
    const successMessage = document.getElementById("formSuccess");
    
    submitBtn.disabled = true;
    submitText.textContent = "Enviando...";
    loadingSpinner.classList.remove("hidden");
    
    const data = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                "Accept": "application/json"
            }
        });
        
        if (response.ok) {
            // Sucesso: mostra mensagem
            successMessage.classList.remove("hidden");
            
            // CORREÇÃO: Inicia contagem regressiva para ATUALIZAR A PÁGINA
            let seconds = 3;
            const countdownElement = document.getElementById("countdown");
            countdownElement.textContent = seconds; // Mostra o 3 inicial
            
            const countdownInterval = setInterval(() => {
                seconds--;
                countdownElement.textContent = seconds;
                
                if (seconds <= 0) {
                    clearInterval(countdownInterval);
                    // ATUALIZA A PÁGINA após 3 segundos
                    location.reload();
                }
            }, 1000);
            
            // Fallback: se algo der errado, atualiza após 4 segundos
            setTimeout(() => {
                location.reload();
            }, 4000);
            
        } else {
            // Erro no envio
            alert("Erro ao enviar. Tente novamente.");
            submitBtn.disabled = false;
            submitText.textContent = "Enviar Mensagem";
            loadingSpinner.classList.add("hidden");
        }
    } catch (error) {
        // Erro de conexão
        alert("Erro de conexão. Tente novamente.");
        submitBtn.disabled = false;
        submitText.textContent = "Enviar Mensagem";
        loadingSpinner.classList.add("hidden");
    }
});

// Preenche automaticamente o campo _replyto com o email digitado
document.getElementById("email").addEventListener("input", function() {
    document.getElementById("replyTo").value = this.value;
});
   