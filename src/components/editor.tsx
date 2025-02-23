import Quill, { Delta, Op, QuillOptions } from 'quill';
import { MdSend } from 'react-icons/md';
import 'quill/dist/quill.snow.css';
import { PiTextAa } from 'react-icons/pi';
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ImageIcon, Smile } from 'lucide-react';
import { Hint } from './hint';

type EditorValue = {
  image: File | null;
  body: string;
};
interface EditorProps {
  variant?: 'create' | 'update';
  onCancel?: () => void;
  onSubmit: (value: EditorValue) => void;
  placeholder?: string;
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  defaultValue?: Delta | Op[];
}
const Editor = ({
  onCancel,
  onSubmit,
  placeholder,
  disabled,
  defaultValue,
  variant = 'create',
}: EditorProps) => {
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const disabledRef = useRef(disabled);
  const defaultValueRef = useRef(defaultValue);
  const quillRef = useRef<Quill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    disabledRef.current = disabled;
    defaultValueRef.current = defaultValue;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );
    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
    };
    const quill = new Quill(editorContainer, options);
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label="Hide formatting">
            <Button
              disabled={false}
              onClick={() => {}}
              size="iconSm"
              variant="ghost"
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button
              disabled={false}
              onClick={() => {}}
              size="iconSm"
              variant="ghost"
            >
              <Smile className="size-4" />
            </Button>
          </Hint>
          {variant === 'create' && (
            <Hint label="Image">
              <Button
                disabled={false}
                onClick={() => {}}
                size="iconSm"
                variant="ghost"
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === 'update' && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                disabled={false}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {}}
                disabled={false}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Update
              </Button>
            </div>
          )}
          {variant === 'create' && (
            <Button
              size="iconSm"
              className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Return </strong> to add a new line
        </p>
      </div>
    </div>
  );
};

export default Editor;
