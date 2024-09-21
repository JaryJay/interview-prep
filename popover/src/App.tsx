import HoverPopover from "./components/hover-popover"

function App() {
  return (
    <div>
      Hello
      <div className="flex m-4 rounded-sm shadow-sm justify-center p-64">
        <HoverPopover trigger={<button className="bg-green-100 hover:bg-green-300 p-2 rounded-lg transition-all">Custom trigger</button>}>
          <div className="m-4">
            Content blah blah blah
            <button className="bg-green-100 hover:bg-green-200 p-2 rounded-sm">Click me</button>
          </div>
        </HoverPopover>
      </div>
    </div>
  )
}

export default App
