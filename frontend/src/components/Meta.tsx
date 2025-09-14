interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string;
  }
  
  const Meta: React.FC<MetaProps> = ({
    title = 'Welcome to ElectroMart',
    description = 'We sell the best products for cheap',
    keywords = 'electronics, buy electronics, cheap electronics',
  }) => {
    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </>
    );
  };
  
  export default Meta;