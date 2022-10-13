# How the app works

So what I did was use scroll trigger functionality of gsap, it gets triggered when the scroll reaches a specific element in the DOM. So What I did was create a Section corrosponding to each slide, when the scroll bar reaches that Section the slide corrosponding to that element is shown.

# Data Array

In the data array, you have triggers, Position and direction. These are the important things. Trigger you can set anything, but it should be unique and start with '.', because it would serve as the name of the class. This trigger name will also be used to create the section. Position of the slide should start at -100 at Z axis so it would seem like the slides are coming from somewhere far. The direction is what direction you want them to appear from. 'center' is from the center of the screen, you can also choose 'right' or 'left but then you would have to make the y of the position of that slide 100 or -100 respectively.

# Dynamic Props

Everything is dynamic, you don't have to change anything in the code, just change the data array and you are good to go. If you want the slides to be loaded dynamically, make a file that would create an array of objects and then import that file in the /Components/SlideComponent/index.jsx and use that array instead of the data array.

# fixes

Removed the slides that were transitioning in top and bottom direction, they were there just to show there are different options.

Commented the scrollbar styles

Removed the fixed positioning and instead made it sticky with the parent container being the whats its relative to.

# 200vh height

So the height is how long would the slide would take to appear, if the height is 100vh it slides would take less time to reach the screen but if you increase the height of the section, slides would take more time to reach.
