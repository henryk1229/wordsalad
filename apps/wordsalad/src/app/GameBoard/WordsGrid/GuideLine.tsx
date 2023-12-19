const GuideLine: React.FC = () => {
  return (
    <div style={{ height: '8px', width: '256px' }}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <line x1="28" y1="20" x2="28" y2="10" stroke="black" />
        <line x1="28" y1="10" x2="228" y2="10" stroke="black" />
        <line x1="228" y1="10" x2="228" y2="1" stroke="black" />
      </svg>
    </div>
  );
};

export default GuideLine;
