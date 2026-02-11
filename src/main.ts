import './style.css'

const yesBtn = document.querySelector<HTMLButtonElement>('#yesBtn')!
const noBtn = document.querySelector<HTMLButtonElement>('#noBtn')!
const messageEl = document.querySelector<HTMLParagraphElement>('#message')!

let moveCount = 0
let shownMessages = new Set<string>()

const lovelyMessages = [
  "I know you'll say yes eventually... because you're amazing! 💕",
  "You're already stealing my heart, just say yes! 💖",
  "Come on, we're meant to be! 💕",
  "You're too sweet to say no! 😊💕",
  "My heart is racing for you! ❤️",
  "You light up my world! ✨💕",
  "I'm falling for you already! 🥰",
  "You make me believe in love! 💕",
  "Every moment with you is special! 💫",
  "You're my favorite person! 🥰💕",
  "Life is beautiful with you! 🌸💕",
  "You deserve all the love in the world! 💕",
  "You're my queen and I'll treat you like royalty (even if you steal the blankets)! 👑💕",
  "I can't imagine life without you! 💫",
  "You make my heart so happy! 💖",
  "Forever starts with yes! 💕✨",
  "You're the one I've been waiting for! 💕",
  "My world is better with you in it! 🌟",
  "You're my greatest blessing! 🙏💕",
  "Every day with you is a gift! 🎁💕",
  "You're the love of my life! 💕",
  "I choose you, always and forever! 💕✨",
  "You make my dreams come true! 💭💕",
  "I'm so lucky to know you! 🍀💕",
  "I'll cook you breakfast every morning... and promise not to burn it! 🍳😄💕",
  "Say yes and make me the happiest! 😄💕",
]

// Yes button click handler
yesBtn.addEventListener('click', () => {
  messageEl.textContent = '💕 Yay! I love you! 💕'
  messageEl.style.color = '#fff'
  messageEl.style.fontSize = '1.8em'
  messageEl.style.fontWeight = 'bold'
  messageEl.classList.add('shake-message')
  noBtn.style.display = 'none'
  
  // Trigger shake animation
  const container = document.querySelector('.container')!
  container.classList.add('shake')
  
  // Trigger celebration
  celebrate()
})

function celebrate() {
  const celebration = document.getElementById('celebration')!
  celebration.classList.add('active')
  
  // Create additional confetti animation
  const confettiPieces = celebration.querySelectorAll('.confetti')
  confettiPieces.forEach((piece, index) => {
    const htmlPiece = piece as HTMLElement
    htmlPiece.style.left = Math.random() * 100 + '%'
    htmlPiece.style.animationDelay = (index * 0.1) + 's'
    htmlPiece.style.animationDuration = (3 + Math.random() * 2) + 's'
  })
}

// No button escape logic
noBtn.addEventListener('mouseenter', () => {
  moveNoButton()
})

noBtn.addEventListener('click', (e) => {
  e.preventDefault()
  moveNoButton()
})

noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault()
  moveNoButton()
})

function moveNoButton() {
  moveCount++
  
  // Get available messages that haven't been shown yet
  const availableMessages = lovelyMessages.filter(msg => !shownMessages.has(msg))
  
  // If all messages have been shown, reset the shown messages
  let randomMessage: string
  if (availableMessages.length === 0) {
    shownMessages.clear()
    randomMessage = lovelyMessages[Math.floor(Math.random() * lovelyMessages.length)]
  } else {
    randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)]
  }
  
  shownMessages.add(randomMessage)
  messageEl.textContent = randomMessage
  messageEl.style.color = '#ffe6f0'
  messageEl.style.fontSize = '1.1em'
  console.log(`Move count: ${moveCount} - ${randomMessage}`);
  
  // After 25 moves, remove the No button
  if (moveCount >= 25) {
    noBtn.classList.add('disappear')
    setTimeout(() => {
      noBtn.style.display = 'none'
    }, 800)
    messageEl.textContent = '💕 You have no choice but to say YES! 💕'
    messageEl.style.color = '#fff'
    messageEl.style.fontSize = '1.3em'
    return
  }
  
  const randomX = Math.random() * 300 - 150
  const randomY = Math.random() * 300 - 150
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`
  noBtn.style.transition = 'all 0.3s ease'
}
