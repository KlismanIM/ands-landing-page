export function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const successMessage = document.getElementById('formSuccess');
        
        // UI Feedback: disable and show spinner
        submitBtn.disabled = true;
        submitText.textContent = "Enviando...";
        loadingSpinner?.classList.remove('hidden');
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });
            
            if (response.ok) {
                // Success
                successMessage?.classList.remove('hidden');
                
                // Countdown reload
                let seconds = 3;
                const countdownEl = document.getElementById('countdown');
                if (countdownEl) countdownEl.textContent = seconds;
                
                const interval = setInterval(() => {
                    seconds--;
                    if (countdownEl) countdownEl.textContent = seconds;
                    if (seconds <= 0) {
                        clearInterval(interval);
                        location.reload();
                    }
                }, 1000);
                
                setTimeout(() => location.reload(), 4000);
            } else {
                alert("Erro ao enviar. Tente novamente.");
                resetFormButton(submitBtn, submitText, loadingSpinner);
            }
        } catch (error) {
            alert("Erro de conexão. Tente novamente.");
            resetFormButton(submitBtn, submitText, loadingSpinner);
        }
    });
    
    // Auto-fill replyTo
    const emailInput = document.getElementById('email');
    const replyToInput = document.getElementById('replyTo');
    if (emailInput && replyToInput) {
        emailInput.addEventListener('input', () => {
            replyToInput.value = emailInput.value;
        });
    }
}

function resetFormButton(btn, text, spinner) {
    btn.disabled = false;
    text.textContent = "Enviar Mensagem";
    spinner?.classList.add('hidden');
}