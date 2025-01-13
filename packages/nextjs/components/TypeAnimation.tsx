import React, { useCallback, useEffect, useRef, useState } from "react";

interface TypeAnimationProps {
  sequence: (string | number)[];
  speed?: number;
  repeat?: boolean;
  cursor?: boolean;
  wrapper?: "div" | "span" | "p";
  className?: string;
  style?: React.CSSProperties;
}

const TypeAnimation = ({
  sequence = [],
  speed = 50,
  repeat = false,
  cursor = true,
  wrapper = "span" as "div" | "span" | "p",
  className,
  style,
}: TypeAnimationProps) => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const handleTyping = useCallback(() => {
    if (!isVisible) return;

    const current = sequence[currentIndex];

    if (typeof current === "number") {
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % sequence.length);
      }, current);
      return;
    }

    if (isDeleting) {
      setText(current.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setCurrentIndex(prev => (prev + 1) % sequence.length);
      }
    } else {
      setText(current.substring(0, text.length + 1));
      if (text.length === current.length) {
        if (!repeat && currentIndex === sequence.length - 1) return;
        setIsDeleting(true);
      }
    }
  }, [currentIndex, isDeleting, repeat, sequence, text, isVisible]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [handleTyping, speed]);

  const Wrapper = wrapper as React.ElementType;

  return (
    <Wrapper ref={elementRef} className={className} style={style}>
      {text}
      {cursor && <span className="animate-pulse">|</span>}
    </Wrapper>
  );
};

export default TypeAnimation;
