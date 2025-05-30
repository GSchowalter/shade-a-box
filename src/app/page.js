"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Link from 'next/link';

const ShadeBoxApp = dynamic(() => import('@/components/ShadeBoxApp'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center">Loading 3D Scene...</div>
});

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Valshape📦</h1>

      <p className="mb-6">
        Welcome to Valshape! A 3D web app designed to help artists study the value of basic forms. Bust out and pen, pencil, tablet, stick, or anything that can make a mark and start shading!
        For now, this app is best used on a large landscape screen, like a laptop or desktop. Each scene is contains a specified amount of shapes at random positions. The lighting position is also random. Use the &quot;REDRAW&quot; button to generate a new scene. 
        You can use the control panel below the scene to customize the number and kind of shapes in the scene. If the camera angle isn&apos;t working for you try the orbit controls under &quot;Advanced Settings&quot;.
        The light controls are useful for scenes where the light may be in a wierd spot or if you specifically want to study dim light scenes.
      </p>

      {/* Light Room Component */}
      <div className="mb-10 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <Suspense fallback={<div className="w-full h-[600px] flex items-center justify-center">Loading 3D Scene...</div>}>
          <ShadeBoxApp />
        </Suspense>
      </div>

      <h2 className="text-2xl font-bold mb-4">Support The Project</h2>
      <p className="mb-6">
        This is a solo project so if you get a lot out of it I would appreciate some support so I know to keep working on it. If you&apos;d like to support the project, you can do so by sharing it with others, providing feedback 📩. You can also donate below. Every bit helps😁!
      </p>
      <a href="https://www.buymeacoffee.com/GSchowalter"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=GSchowalter&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
      <br />
      <h2 className="text-2xl font-bold mb-4">About This Project</h2>
      <p className="mb-6">
        I built this tool mainly for myself and thought others would benefit as well. Studying simple forms like these is a great way to work towards mastery.
        Improving your understanding of light and shadow starts by building a rock solid foundation with basic forms. Use this tool to lay the bricks that your sky scrapper will one day stand on. Or just to stay fresh. <br /> <br />
      </p>

      <h2 className="text-2xl font-bold mb-4">Beta disclaimer</h2>
      <p className="mb-6">
        This application is currently in beta. If you have feedback you can email me! My email can be found on my personal site <Link className="underline" href="https://gschowalter.github.io/">here</Link>.
      </p>
      <ul>
        <p className='font-bold'>Known issues:</p>
        <li className="mb-2">
          - Mobile view works but is not pretty and shapes may be rendered outside the viewing window.
        </li>
        <li className="mb-2">
          - Shapes may render inside eachother (not sure if this is a bug or feature though. I think it&apos;s cool 😎)
        </li>
      </ul>
      <ul>
        <p className='font-bold'>Features in the works:</p>
        <li className="mb-2">
          - Different materials for shapes (metalic, cartoon, etc.)
        </li>
        <li className="mb-2">
          - Procedurally generated 3D blobs to help study more organic forms.
        </li>
        <li className="mb-2">
          - More shapes (dodecahedron, pyramid, etc.)
        </li>
        <li className="mb-2">
          - Timed study sessions. Adding a timer and switching scenes automatically. 
          </li>
      </ul>

      <h2 className="text-l font-bold mb-4 pt-4">Course Recommendations</h2>
      <ul>
        <li>
          - <Link className="underline" href="https://www.drawabox.com" >The Draw A Box Cource by Uncomfortable</Link>.
        For those of you who are looking to improve your spacial reasoning skills I can&apos;t recommend this course enough. It&apos;s completely free with the option to pay for professional critique.
        </li>
        <li>
          - <Link className="underline" href="https://www.proko.com/course/drawing-basics" >Proko Drawing Basics</Link>.
        A paid course that covers the basics of drawing. It&apos;s a great course for those who want to learn the fundamentals and have a bit of money to spend.
        </li>
      </ul>
    </main>
  );
}