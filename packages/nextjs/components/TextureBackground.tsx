export const TextureBackground = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
      repeating-linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.075) 0px,
        rgba(255, 255, 255, 0.075) 1px,
        transparent 1px,
        transparent 3px
      )
    `,
        backgroundSize: "4px 4px",
      }}
    />
  );
};
