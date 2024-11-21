# 🦖 Dino Run Clone 🦖

Welcome to **Dino Run Clone** – a reimagined version of the classic Google dinosaur game with some new twists! This project is a **university mini-project** designed to apply knowledge of **design patterns** in a fun and interactive way. Built using **HTML**, **CSS**, and **TypeScript**, it brings the thrill of dodging obstacles in a fast-paced, endless runner format.

## 🚀 Features

- **Smooth animations** using sprites for various actions (idle, running, ducking).
- **Dynamic backgrounds** that change based on different game modes.
- **Scoring system** that tracks how long you survive without hitting obstacles.
  
## 🎮 How to Play

1. **Select a Theme** – When you start the game, you'll see a screen asking you to choose a theme (e.g., Forest, Desert, Hell).
2. **Get Ready to Run** – After selecting a theme, the game will load, and you’ll see your dinosaur ready to start.
3. **Start Running** – Press **space** or **up arrow** to begin running.
4. **Dodge Obstacles** – Each game session features obstacles with randomly selected behaviors – stay alert!
5. **Survive** – Keep going as long as you can to achieve the highest score!

## 🛠️ Technologies Used

- **HTML** & **CSS** – For building the structure and styling of the game.
- **TypeScript** – Adding type safety and enhancing JavaScript with better tooling.
- **Canvas API** – For rendering game elements and animations.

## 🧩 Design Patterns

We've used several design patterns to make the code modular, reusable, and maintainable:

1. **Factory Pattern 🏭**:
   - We use the factory pattern for creating different types of obstacles and backgrounds dynamically. This allows for easy extension of new backgrounds and obstacles without changing existing code.

2. **Strategy Pattern 🧠**:
   - Our game has different strategies for obstacle behavior. For instance, some obstacles might move at varying speeds or follow unique patterns. This flexibility is achieved by using the strategy pattern, which makes switching obstacle behaviors easy.

3. **Singleton Pattern 🧩**:
   - The game’s `GameData` class acts as a singleton, ensuring there is only one instance managing game data like score and other global game states.

4. **Prototype Pattern 🧬**:
   - We use the prototype pattern to clone obstacles. This allows the game to quickly generate new obstacles with similar properties without creating each one from scratch, enhancing performance.

Here's the updated **How to Run** section to include the Vite setup:

## 🏃 How to run

1. **Try it Online**: You can check out the game directly [here on Vercel](https://dinorun-beta.vercel.app/)!

2. **Run Locally**:
   - Clone the repository:
     ```bash
     git clone https://github.com/vicetr3s/dinorun.git
     ```
   - Navigate into the project directory:
     ```bash
     cd dinorun
     ```
   - Install dependencies using npm:
     ```bash
     npm install
     ```
   - Start the development server with Vite:
     ```bash
     npm run dev
     ```
   - Open the provided localhost URL in your browser, and you're ready to run! 🎉

## 📸 Screenshots

### Menu
![image](https://github.com/user-attachments/assets/99803222-75ea-497e-b641-c48853bb292e)

### Idle game
![image](https://github.com/user-attachments/assets/c646fa0c-5b72-4ab7-aa2d-9a1036f15b3a)

### Running
![image](https://github.com/user-attachments/assets/82161a68-be21-4cf2-884e-6032cfc2e845)



