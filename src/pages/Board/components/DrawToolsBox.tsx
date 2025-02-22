import { useState, useEffect, useCallback } from 'react';
import {
  FaHandPaper,
  FaPen,
  FaEraser,
  FaDrawPolygon,
  FaArrowRight,
  FaArrowLeft,
  FaCircle,
} from 'react-icons/fa';
import { IoText, IoSquare } from 'react-icons/io5';

interface DrawToolsBoxProps {
  tool: string | null;
  setTool: (tool: string) => void;
  isKeyboardShortcutsDisable?: boolean;
}

const DEBOUNCE_DELAY = 150; // milliseconds

const DrawToolsBox = ({
  tool,
  setTool,
  isKeyboardShortcutsDisable,
}: DrawToolsBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastKeyTime, setLastKeyTime] = useState(0);

  // Toggle the toolbox open/close
  const toggleToolBox = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Handle tool change
  const handleToolChange = useCallback(
    (newTool: string) => {
      if (newTool === tool) {
        setTool('default');
        return;
      }
      setTool(newTool);
    },
    [tool, setTool]
  );

  // Add keyboard shortcuts with debounce
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyboardShortcutsDisable) return;

      const currentTime = Date.now();
      if (currentTime - lastKeyTime < DEBOUNCE_DELAY) {
        return;
      }
      setLastKeyTime(currentTime);

      // Check for Space key (both " " and "Space")
      if (event.key === ' ' || event.key === 'Space') {
        event.preventDefault(); // Prevent default scrolling behavior
        setTool('hand');
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'r':
          handleToolChange('default');
          break;
        case 'p':
          handleToolChange('pen');
          break;
        case 'h':
          handleToolChange('hand');
          break;
        case 'e':
          handleToolChange('eraser');
          break;
        case 'a':
          handleToolChange('text');
          break;
        case 'l':
          handleToolChange('line');
          break;
        case 's':
          handleToolChange('square');
          break;
        case 'i':
          handleToolChange('circle');
          break;
        case 't':
          toggleToolBox();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      // Check for Space key (both " " and "Space")
      if (event.key === ' ' || event.key === 'Space') {
        setTool('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    tool,
    handleToolChange,
    lastKeyTime,
    toggleToolBox,
    isKeyboardShortcutsDisable,
    setTool,
  ]);

  // Click handler to avoid inline functions in JSX
  const handleClick = (toolName: string) => () => {
    handleToolChange(toolName);
  };

  return (
    <div className="fixed top-1/3 -translate-y-1/2 w-36 left-0 p-4 rounded-lg z-30">
      <button
        aria-label="Toggle Tool Box"
        tabIndex={0}
        className="absolute top-36 left-2 bg-black rounded-full flex items-center justify-center w-9 h-9 text-white"
        onClick={toggleToolBox}
        title="Toggle Tool Box"
      >
        {isOpen ? <FaArrowLeft size={18} /> : <FaArrowRight size={18} />}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? 'transform translate-x-0 opacity-100 visible'
            : 'transform -translate-x-full opacity-0 invisible'
        }`}
      >
        <button
          aria-label="Hand Tool"
          tabIndex={0}
          className={`absolute top-4 left-2 bg-black rounded-full flex items-center justify-center w-9 h-9 text-white transition-transform ${
            tool === 'hand' ? 'bg-blue-500' : ''
          } hover:scale-110 hover:border-blue-500 border-2`}
          onClick={handleClick('hand')}
          title="Hand Tool"
        >
          <FaHandPaper size={18} />
        </button>

        <button
          aria-label="Pen Tool"
          tabIndex={0}
          className={`absolute top-12 left-12 bg-black rounded-full flex items-center justify-center w-9 h-9 text-white transition-transform ${
            tool === 'pen' ? 'bg-blue-500' : ''
          } hover:scale-110 hover:border-blue-500 border-2`}
          onClick={handleClick('pen')}
          title="Pen Tool"
        >
          <FaPen size={18} />
        </button>

        <button
          aria-label="Eraser Tool"
          tabIndex={0}
          className={`absolute top-24 left-20 bg-black rounded-full flex items-center justify-center w-9 h-9 text-white transition-transform ${
            tool === 'eraser' ? 'bg-blue-500' : ''
          } hover:scale-110 hover:border-blue-500 border-2`}
          onClick={handleClick('eraser')}
          title="Eraser Tool"
        >
          <FaEraser size={18} />
        </button>

        <button
          aria-label="Text Tool"
          tabIndex={0}
          className={`absolute top-36 left-28 bg-black rounded-full flex items-center justify-center w-9 h-9 text-white transition-transform ${
            tool === 'text' ? 'bg-blue-500' : ''
          } hover:scale-110 hover:border-blue-500 border-2`}
          onClick={handleClick('text')}
          title="Text Tool"
        >
          <IoText size={18} />
        </button>

        <button
          aria-label="Line Tool"
          tabIndex={0}
          className={`absolute top-48 left-20 bg-black rounded-full flex items-center justify-center w-9 h-9 text-white transition-transform ${
            tool === 'line' ? 'bg-blue-500' : ''
          } hover:scale-110 hover:border-blue-500 border-2`}
          onClick={handleClick('line')}
          title="Line Tool"
        >
          <FaDrawPolygon size={18} />
        </button>

        <button
          aria-label="Square Tool"
          tabIndex={0}
          className={`absolute top-56 left-12 bg-black rounded-full hidden items-center justify-center w-9 h-9 text-white transition-transform ${
            tool === 'square' ? 'bg-blue-500' : ''
          } hover:scale-110 hover:border-blue-500 border-2`}
          onClick={handleClick('square')}
          title="Square Tool"
        >
          <IoSquare size={18} />
        </button>

        <button
          aria-label="Triangle Tool"
          tabIndex={0}
          className={`absolute top-64 left-2 bg-black rounded-full hidden items-center justify-center w-9 h-9 text-white transition-transform ${
            tool === 'triangle' ? 'bg-blue-500' : ''
          } hover:scale-110 hover:border-blue-500 border-2`}
          onClick={handleClick('triangle')}
          title="Triangle Tool"
        >
          <FaCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default DrawToolsBox;
