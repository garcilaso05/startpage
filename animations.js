// Este archivo contiene las funciones para inicializar y manejar las animaciones y burbujas en la página de inicio.

document.addEventListener('DOMContentLoaded', () => {
    initializeBubbles(); // Inicializa las burbujas si no existen en el almacenamiento local
    createBubbles(); // Crea las burbujas en la página
    addSearchBarEffects(); // Añade efectos a la barra de búsqueda
    animateBubbles(); // Anima las burbujas
    bubbleInterval = setInterval(emitBubbles, 1000); // Emite burbujas cada 1000ms

    // Establece las imágenes iniciales de los botones
    document.getElementById('resetButton').src = 'reset.png';
    document.getElementById('toggleAnimationsButton').src = 'animacionesOn.png';
    document.getElementById('changeBackgroundButton').src = 'changeBackground.png'; // Establece la imagen inicial para el nuevo botón
    document.getElementById('uploadBackgroundButton').src = 'upload.png'; // Establece la imagen inicial para el nuevo botón

    // Carga un fondo aleatorio al abrir la página
    loadRandomBackground();

    // Enfoca el input de búsqueda cuando la página carga
    document.getElementById('search').focus();
});

let animationsEnabled = true; // Variable para controlar si las animaciones están habilitadas
let bubbleInterval; // Intervalo para emitir burbujas
const backgrounds = ['assets/backgrounds/fondo1.jpg', 'assets/backgrounds/fondo2.jpg', 'assets/backgrounds/fondo3.jpg', 'assets/backgrounds/fondo4.jpg', 'assets/backgrounds/fondo5.jpg']; // Lista de fondos disponibles
const backgroundsMobil = ['assets/backgrounds/fondoM1.jpg', 'assets/backgrounds/fondoM2.jpg', 'assets/backgrounds/fondoM3.jpg', 'assets/backgrounds/fondoM4.jpg', 'assets/backgrounds/fondoM5.jpg']; // Lista de fondos disponibles para mobiles.
let currentBackgroundIndex = 0; // Variable para llevar el seguimiento del fondo actual

function initializeBubbles() {
    if (!localStorage.getItem('bubbles')) {
        const initialBubbles = [
            // Lista de burbujas iniciales con sus propiedades
            {
                "name": "YouTube",
                "backgroundColor": "hsl(0, 70%, 80%)",
                "link": "https://www.youtube.com/",
                "image": "assets/logos/youtube.png"
            },
            {
                "name": "WhatsApp",
                "backgroundColor": "hsl(120, 70%, 80%)",
                "link": "https://web.whatsapp.com/",
                "image": "assets/logos/whatsapp.png"
            },
            {
                "name": "Gmail",
                "backgroundColor": "hsl(240, 70%, 80%)",
                "link": "https://mail.google.com/",
                "image": "assets/logos/gmail.png"
            },
            {
                "name": "Google Drive",
                "backgroundColor": "hsl(60, 70%, 80%)",
                "link": "https://drive.google.com/drive/home",
                "image": "assets/logos/drive.png"
            },
            {
                "name": "Copilot",
                "backgroundColor": "hsl(300, 70%, 80%)",
                "link": "https://copilot.microsoft.com/",
                "image": "assets/logos/copilot.png"
            },
            {
                "name": "GitHub",
                "backgroundColor": "hsl(30, 70%, 80%)",
                "link": "https://github.com/garcilaso05",
                "image": "assets/logos/github.png"
            },
            {
                "name": "Spotify",
                "backgroundColor": "hsl(90, 70%, 80%)",
                "link": "https://open.spotify.com/",
                "image": "assets/logos/spotify.png"
            },
            {
                "name": "ChatGPT",
                "backgroundColor": "hsl(150, 70%, 80%)",
                "link": "https://chatgpt.com/",
                "image": "assets/logos/chatgpt.png"
            },
            {
                "name": "OneDrive",
                "backgroundColor": "hsl(210, 70%, 80%)",
                "link": "https://rovira-my.sharepoint.com/",
                "image": "assets/logos/onedrive.png"
            },
            {
                "name": "Deepl",
                "backgroundColor": "hsl(182, 37.80%, 64.70%)",
                "link": "https://www.deepl.com/es/translator",
                "image": "assets/logos/deepl.png"
            },
            {
                "name": "SoftCatala",
                "backgroundColor": "hsl(327, 69.20%, 87.30%)",
                "link": "https://www.softcatala.org/corrector/",
                "image": "assets/logos/softcatala.png"
            },
            {
                "name": "Campus Virtual URV",
                "backgroundColor": "hsl(45, 70%, 80%)",
                "link": "https://campusvirtual.urv.cat/my/",
                "image": "assets/logos/moodle.png"
            },
            {
                "name": "Outlook",
                "backgroundColor": "hsl(75, 70%, 80%)",
                "link": "https://outlook.office.com/mail/",
                "image": "assets/logos/outlook.png"
            },
            {
                "name": "Linkedin",
                "backgroundColor": "hsl(195, 70%, 80%)",
                "link": "https://www.linkedin.com/feed/",
                "image": "assets/logos/linkedin.png"
            }
        ];
        localStorage.setItem('bubbles', JSON.stringify(initialBubbles)); // Guarda las burbujas iniciales en el almacenamiento local
    }
}

function toggleAnimations() {
    animationsEnabled = !animationsEnabled; // Alterna el estado de las animaciones
    const bubbles = document.querySelectorAll('.bubble, .floating-bubble');
    bubbles.forEach(bubble => {
        if (bubble.classList.contains('floating-bubble')) {
            bubble.style.display = animationsEnabled ? 'block' : 'none'; // Muestra u oculta las burbujas flotantes
        } else {
            bubble.style.animationPlayState = animationsEnabled ? 'running' : 'paused'; // Pausa o reanuda la animación de las burbujas
        }
    });

    if (animationsEnabled) {
        bubbleInterval = setInterval(emitBubbles, 1000); // Reinicia el intervalo de emisión de burbujas
        document.getElementById('toggleAnimationsButton').src = 'animacionesOn.png'; // Cambia la imagen del botón
    } else {
        clearInterval(bubbleInterval); // Detiene el intervalo de emisión de burbujas
        document.getElementById('toggleAnimationsButton').src = 'animacionesOff.png'; // Cambia la imagen del botón
    }
}

function changeBackground() {
    const isMobile = window.innerWidth <= 768;
    const backgroundsToUse = isMobile ? backgroundsMobil : backgrounds;
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundsToUse.length;
    const newBackground = backgroundsToUse[currentBackgroundIndex];

    const img = new Image();
    img.src = newBackground;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${newBackground}')`;
    };
}

function loadRandomBackground() {
    const isMobile = window.innerWidth <= 768;
    const backgroundsToUse = isMobile ? backgroundsMobil : backgrounds;
    const randomIndex = Math.floor(Math.random() * backgroundsToUse.length);
    const newBackground = backgroundsToUse[randomIndex];

    const img = new Image();
    img.src = newBackground;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${newBackground}')`;
    };
}

function createBubbles() {
    let positions = []; // Array para almacenar las posiciones de las burbujas
    const bubbles = JSON.parse(localStorage.getItem('bubbles')) || []; // Obtiene las burbujas del almacenamiento local
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    const margin = 0.1 * Math.min(window.innerWidth, window.innerHeight); // Margen del 10%

    bubbles.forEach((bubble, i) => {
        let bubbleElement = document.createElement('a');
        bubbleElement.classList.add('bubble');
        bubbleElement.href = bubble.link;
        bubbleElement.target = '_blank';
        bubbleElement.style.setProperty('--bubble-color', bubble.backgroundColor); // Establece la variable CSS para el color de la burbuja
        let size = window.innerWidth < 768 ? Math.random() * 20 + 40 : Math.random() * 30 + 65; // Tamaño de la burbuja según el tamaño de la pantalla
        let x, y, overlapping;

        do {
            x = Math.random() * (window.innerWidth - size - 2 * margin) + margin;
            y = Math.random() * (window.innerHeight - size - 2 * margin) + margin;
            overlapping = positions.some(pos => Math.hypot(pos.x - x, pos.y - y) < (size + pos.size) / 2);
        } while (overlapping || (y > containerRect.top - size && y < containerRect.bottom + size));

        const relativeX = x - centerX;
        const relativeY = y - centerY;
        positions.push({ x, y, relativeX, relativeY, size });

        bubbleElement.style.width = `${size}px`;
        bubbleElement.style.height = `${size}px`;
        bubbleElement.style.background = bubble.backgroundColor; // Asegura colores únicos
        bubbleElement.style.borderColor = bubble.backgroundColor; // Establece el color del borde para que coincida con el color de la burbuja
        bubbleElement.style.top = `${y}px`;
        bubbleElement.style.left = `${x}px`;
        let img = document.createElement('img');
        if (bubble.image) {
            img.src = bubble.image;
            bubbleElement.appendChild(img);
        } else {
            let text = document.createElement('div');
            text.innerText = bubble.name;
            text.style.color = '#fff';
            text.style.textAlign = 'center';
            text.style.padding = '10px';
            bubbleElement.appendChild(text);
        }

        // Añadir botón de eliminar
        let deleteButton = document.createElement('div');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '×';
        deleteButton.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            deleteBubble(i);
        };
        bubbleElement.appendChild(deleteButton);

        bubbleElement.onmouseover = () => {
            deleteButton.style.opacity = '1';
            deleteButton.style.visibility = 'visible';
        };
        bubbleElement.onmouseout = () => {
            setTimeout(() => {
                if (!deleteButton.matches(':hover')) {
                    deleteButton.style.opacity = '0';
                    deleteButton.style.visibility = 'hidden';
                }
            }, 400); // Retrasa la desaparición por 400ms
        };

        // Añadir funcionalidad de arrastre
        let isDragging = false;
        let offsetX, offsetY;
        let wasDragging = false;

        bubbleElement.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Previene el comportamiento de arrastre por defecto
            isDragging = true;
            wasDragging = false;
            offsetX = e.clientX - bubbleElement.getBoundingClientRect().left;
            offsetY = e.clientY - bubbleElement.getBoundingClientRect().top;
            bubbleElement.classList.add('dragging');
            bubbleElement.style.animationPlayState = 'paused'; // Pausa la animación durante el arrastre
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                wasDragging = true;
                bubbleElement.style.top = `${e.clientY - offsetY}px`;
                bubbleElement.style.left = `${e.clientX - offsetX}px`;
                checkWindowBounds(bubbleElement, size);
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (isDragging) {
                isDragging = false;
                bubbleElement.classList.remove('dragging');
                if (animationsEnabled) {
                    bubbleElement.style.animationPlayState = 'running'; // Reanuda la animación después del arrastre solo si las animaciones están habilitadas
                }
            }
        });

        bubbleElement.addEventListener('click', (e) => {
            if (wasDragging) {
                e.preventDefault(); // Previene que el enlace se abra si fue arrastrado
            }
        });

        // Añadir funcionalidad de arrastre táctil
        bubbleElement.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Previene el comportamiento de arrastre por defecto
            isDragging = true;
            wasDragging = false;
            const touch = e.touches[0];
            offsetX = touch.clientX - bubbleElement.getBoundingClientRect().left;
            offsetY = touch.clientY - bubbleElement.getBoundingClientRect().top;
            bubbleElement.classList.add('dragging');
            bubbleElement.style.animationPlayState = 'paused'; // Pausa la animación durante el arrastre
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                wasDragging = true;
                const touch = e.touches[0];
                bubbleElement.style.top = `${touch.clientY - offsetY}px`;
                bubbleElement.style.left = `${touch.clientX - offsetX}px`;
                checkWindowBounds(bubbleElement, size);
            }
        });

        document.addEventListener('touchend', (e) => {
            if (isDragging) {
                isDragging = false;
                bubbleElement.classList.remove('dragging');
                if (animationsEnabled) {
                    bubbleElement.style.animationPlayState = 'running'; // Reanuda la animación después del arrastre solo si las animaciones están habilitadas
                }
            }
        });

        document.addEventListener('touchcancel', (e) => {
            if (isDragging) {
                isDragging = false;
                bubbleElement.classList.remove('dragging');
                if (animationsEnabled) {
                    bubbleElement.style.animationPlayState = 'running'; // Reanuda la animación después del arrastre solo si las animaciones están habilitadas
                }
            }
        });

        document.body.appendChild(bubbleElement);
    });

    // Reposiciona y redimensiona las burbujas al redimensionar la ventana
    window.addEventListener('resize', () => {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;
        let availablePositions = [];

        positions.forEach((pos, index) => {
            const bubble = document.querySelectorAll('.bubble')[index];
            if (bubble) {
                let newX = centerX + pos.relativeX;
                let newY = centerY + pos.relativeY;

                // Asegura que las burbujas se mantengan dentro de los límites de la ventana
                newX = Math.max(margin, Math.min(newX, window.innerWidth - pos.size - margin));
                newY = Math.max(margin, Math.min(newY, window.innerHeight - pos.size - margin));

                // Asegura que las burbujas no se superpongan
                let overlapping = availablePositions.some(ap => Math.hypot(ap.x - newX, ap.y - newY) < (pos.size + ap.size) / 2);
                if (!overlapping) {
                    bubble.style.top = `${newY}px`;
                    bubble.style.left = `${newX}px`;
                    bubble.style.transition = 'top 0.5s, left 0.5s'; // Añade transición para un deslizamiento suave
                    bubble.style.display = 'block';
                    availablePositions.push({ x: newX, y: newY, size: pos.size });
                } else {
                    bubble.style.display = 'none';
                }

                // Ajusta el tamaño de la burbuja según el ancho de la ventana
                let newSize = window.innerWidth < 768 ? Math.random() * 20 + 40 : Math.random() * 30 + 65;
                bubble.style.width = `${newSize}px`;
                bubble.style.height = `${newSize}px`;
            }
        });
    });
}

function checkWindowBounds(bubble, size) {
    const rect = bubble.getBoundingClientRect();
    if (rect.left < 0) {
        bubble.style.left = '0px';
    }
    if (rect.top < 0) {
        bubble.style.top = '0px';
    }
    if (rect.right > window.innerWidth) {
        bubble.style.left = `${window.innerWidth - size}px`;
    }
    if (rect.bottom > window.innerHeight) {
        bubble.style.top = `${window.innerHeight - size}px`;
    }
}

function deleteBubble(index) {
    const bubbles = JSON.parse(localStorage.getItem('bubbles')) || [];
    bubbles.splice(index, 1);
    localStorage.setItem('bubbles', JSON.stringify(bubbles));
    location.reload();
}

function resetBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        const size = parseFloat(bubble.style.width);
        let x, y, overlapping;
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;
        const margin = 0.1 * Math.min(window.innerWidth, window.innerHeight); // Margen del 10%

        do {
            x = Math.random() * (window.innerWidth - size - 2 * margin) + margin;
            y = Math.random() * (window.innerHeight - size - 2 * margin) + margin;
            overlapping = Array.from(bubbles).some(pos => {
                if (pos === bubble) return false;
                const posX = parseFloat(pos.style.left);
                const posY = parseFloat(pos.style.top);
                return Math.hypot(posX - x, posY - y) < (size + parseFloat(pos.style.width)) / 2;
            });
        } while (overlapping || (y > containerRect.top - size && y < containerRect.bottom + size));

        bubble.style.top = `${y}px`;
        bubble.style.left = `${x}px`;
        bubble.style.transition = 'top 0.5s, left 0.5s'; // Añade transición para un deslizamiento suave
    });
}

function addSearchBarEffects() {
    const searchBar = document.getElementById('search');
    const container = document.querySelector('.container');

    searchBar.addEventListener('input', (event) => {
        if (event.key !== 'Enter') {
            container.classList.add('highlight');
            setTimeout(() => {
                container.classList.remove('highlight');
            }, 100); // Efecto de resaltado más rápido
            emitBubbles();
        }
    });

    searchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const query = searchBar.value;
            window.open(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, '_blank');
        }
    });

    searchBar.addEventListener('click', () => {
        container.classList.add('highlight');
        setTimeout(() => {
            container.classList.remove('highlight');
        }, 100); // Efecto de resaltado más rápido
    });
}

function emitBubbles() {
    if (!animationsEnabled) return; // Verifica si las animaciones están habilitadas

    const bubbleCount = 3; // Reduce el número de burbujas
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('floating-bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`; // Posición inicial aleatoria
        bubble.style.width = `${Math.random() * 20 + 10}px`; // Tamaño aleatorio
        bubble.style.height = bubble.style.width;
        document.body.appendChild(bubble);
        setTimeout(() => {
            bubble.remove();
        }, 3000); // Elimina la burbuja después de 3 segundos
    }
}

function animateBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        const randomDuration = Math.random() * 4 + 6; // Duración aleatoria entre 5 y 10 segundos
        const randomX = Math.random() * 20 - 10; // Movimiento aleatorio entre -10 y 10 píxeles
        const randomY = Math.random() * 20 - 10;
        bubble.style.animation = `float ${randomDuration}s ease-in-out infinite`;
        bubble.style.setProperty('--randomX', `${randomX}px`);
        bubble.style.setProperty('--randomY', `${randomY}px`);
    });
}

function openAddBubbleWindow() {
    document.getElementById('addBubbleWindow').style.display = 'block';
}

function closeAddBubbleWindow() {
    document.getElementById('addBubbleWindow').style.display = 'none';
    resetAddBubbleWindow();
}

function resetAddBubbleWindow() {
    document.getElementById('bubbleName').value = '';
    document.getElementById('bubbleLink').value = '';
    document.getElementById('bubbleColor').value = '#ff0000';
    document.getElementById('bubbleImage').value = '';
}

function addBubble() {
    const name = document.getElementById('bubbleName').value.trim();
    const link = document.getElementById('bubbleLink').value;
    const color = document.getElementById('bubbleColor').value;
    const imageInput = document.getElementById('bubbleImage');
    const imageFile = imageInput.files[0];

    if (!name) {
        alert('El nombre de la burbuja no puede estar vacío.');
        return;
    }

    let imagePath = '';

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePath = event.target.result;
            saveBubble(name, link, color, imagePath);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveBubble(name, link, color, '');
    }
}

function saveBubble(name, link, color, imagePath) {
    const bubbles = JSON.parse(localStorage.getItem('bubbles')) || [];

    // Verifica si hay nombres o enlaces duplicados
    const duplicate = bubbles.some(bubble => bubble.name === name || bubble.link === link);
    if (duplicate) {
        return;
    }

    bubbles.push({ name, link, backgroundColor: color, image: imagePath });
    localStorage.setItem('bubbles', JSON.stringify(bubbles));
    location.reload();
}

function initBubble() {
    saveBubble("YouTube", "https://www.youtube.com/", "hsl(0, 70%, 80%)", "assets/logos/youtube.png");
    saveBubble("WhatsApp", "https://web.whatsapp.com/", "hsl(120, 70%, 80%)", "assets/logos/whatsapp.png");
    saveBubble("Gmail", "https://mail.google.com/", "hsl(240, 70%, 80%)", "assets/logos/gmail.png");
    saveBubble("Google Drive", "https://drive.google.com/drive/home", "hsl(60, 70%, 80%)", "assets/logos/drive.png");
    saveBubble("Copilot", "https://copilot.microsoft.com/", "hsl(300, 70%, 80%)", "assets/logos/copilot.png");
    saveBubble("GitHub", "https://github.com/garcilaso05", "hsl(30, 70%, 80%)", "assets/logos/github.png");
    saveBubble("Spotify", "https://open.spotify.com/", "hsl(90, 70%, 80%)", "assets/logos/spotify.png");
    saveBubble("ChatGPT", "https://chatgpt.com/", "hsl(150, 70%, 80%)", "assets/logos/chatgpt.png");
    saveBubble("OneDrive", "https://rovira-my.sharepoint.com/", "hsl(210, 70%, 80%)", "assets/logos/onedrive.png");
    saveBubble("Deepl", "https://www.deepl.com/es/translator", "hsl(182, 37.80%, 64.70%)", "assets/logos/deepl.png");
    saveBubble("SoftCatala", "https://www.softcatala.org/corrector/", "hsl(327, 69.20%, 87.30%)", "assets/logos/softcatala.png");
    saveBubble("Campus Virtual URV", "https://campusvirtual.urv.cat/my/", "hsl(45, 70%, 80%)", "assets/logos/moodle.png");
    saveBubble("Outlook", "https://outlook.office.com/mail/", "hsl(75, 70%, 80%)", "assets/logos/outlook.png");
    saveBubble("Linkedin", "https://www.linkedin.com/feed/", "hsl(195, 70%, 80%)", "assets/logos/linkedin.png");
}

function search() {
    const query = document.getElementById('search').value;
    window.open(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, '_blank');
}

function openUploadBackgroundWindow() {
    document.getElementById('backgroundImageInput').click();
}

function uploadBackground() {
    const fileInput = document.getElementById('backgroundImageInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.body.style.backgroundImage = `url('${imageUrl}')`;
        };
        reader.readAsDataURL(file);
    }
}

function loadCustomBackground() {
    const customBackground = localStorage.getItem('customBackground');
    if (customBackground) {
        document.body.style.backgroundImage = `url('${customBackground}')`;
    } else {
        // Asegura que siempre se establezca una imagen de fondo predeterminada
        document.body.style.backgroundImage = `url('${backgrounds[0]}')`;
    }
}