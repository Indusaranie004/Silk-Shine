import { Box, Flex, Text, Button, Grid, GridItem, Image } from "@chakra-ui/react"
import Navigation from "./navigation.js"
import "../styles/home.css"

export default function Home() {
  return (
    <Box minH="100vh" sx={{ scrollBehavior: "smooth" }}>
      <Navigation />
      
      {/* Hero Section with Full Width Background Image */}
      <Box 
        className="hero-section" 
        position="relative" 
        minH="100vh"
        w="100vw"
        ml="calc(-50vw + 50%)"
        overflow="hidden"
      >
        {/* Background Image */}
        <Image 
          src={require("../assets/images/HomeBG.png")}
          alt="Beauty salon treatment"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          objectFit="cover"
          zIndex={1}
        />
        
        {/* Dark Overlay for better text readability */}
        <Box 
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.4)"
          zIndex={2}
        />
        
        {/* Content Overlay */}
        <Flex 
          position="relative" 
          zIndex={3} 
          minH="100vh" 
          align="center" 
          justify="center"
          px={8}
        >
          <Box textAlign="center" maxW="800px" mx="auto" mt={20}>
            <Text className="hero-title" fontSize={{ base: "5xl", md: "7xl" }} fontWeight="bold" lineHeight="1.1" mb={6} color="white">
              Welcome to Silk & Shine
            </Text>
            
            <Text className="hero-description" fontSize="lg" mb={8} maxW="500px" mx="auto" color="rgba(255, 255, 255, 0.9)">
              Transform your look with our premium beauty treatments. Expert stylists, luxury experience, stunning results.
            </Text>
            
            {/* Button scrolls down to services section */}
            <Button 
              as="a"
              href="#services-section"
              className="hero-cta" 
              size="lg"
              textDecoration="none"
              _hover={{ bg: "#8b5cf6", color: "white", textDecoration: "none" }}
            >
              Get Started
            </Button>
          </Box>
        </Flex>
      </Box>
      
      {/* Stats Section */}
      <Box className="stats-section" py={16} px={8}>
        <Grid templateColumns="repeat(3, 1fr)" gap={12} maxW="1000px" mx="auto">
          <GridItem textAlign="center">
            <Text className="stat-number" fontSize="3xl" fontWeight="bold" mb={2}>
              500+
            </Text>
            <Text className="stat-label" fontSize="sm">
              Happy Clients
            </Text>
          </GridItem>
          
          <GridItem textAlign="center">
            <Text className="stat-number" fontSize="3xl" fontWeight="bold" mb={2}>
              10+
            </Text>
            <Text className="stat-label" fontSize="sm">
              Years Experience
            </Text>
          </GridItem>
          
          <GridItem textAlign="center">
            <Text className="stat-number" fontSize="3xl" fontWeight="bold" mb={2}>
              50+
            </Text>
            <Text className="stat-label" fontSize="sm">
              Services
            </Text>
          </GridItem>
        </Grid>
      </Box>
      
      {/* Services Preview */}
      <Box id="services-section" className="services-preview" py={20} px={8} w="100vw" ml="calc(-50vw + 50%)">
        <Box maxW="1400px" mx="auto">
          <Grid templateColumns="1fr 1fr" gap={16} alignItems="center">
            {/* Left Image */}
            <GridItem>
              <Image 
                src={require("../assets/images/ServicesBG.webp")}
                alt="Beauty spa treatment"
                h="500px"
                w="full"
                objectFit="cover"
                borderRadius="lg"
              />
            </GridItem>
            
            {/* Right Content */}
            <GridItem>
              <Text className="section-subtitle" fontSize="sm" fontWeight="medium" mb={4}>
                OUR SERVICES
              </Text>
              
              <Text className="section-title" fontSize="4xl" fontWeight="bold" mb={6}>
                Right Treatments,
                <br />
                <Text as="span" className="section-title-accent">Just made for you</Text>
              </Text>
              
              <Text className="section-description" fontSize="lg" mb={8} lineHeight="1.6">
                Indulge in a wide range of beauty and wellness treatments custom-designed to rejuvenate your body and soul.
              </Text>
              
              <Button 
                as="a"
                href="/services"
                className="section-cta" 
                size="lg"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                View All Services
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}