import { Box, Flex, Text, Button, Grid, GridItem, Image, Link } from "@chakra-ui/react"
import Navigation from "./navigation.js"
import "../styles/home.css"

export default function Home() {
  return (
    <Box minH="100vh">
      <Navigation showLogout={false} />
      
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
            <Text className="hero-title" fontSize={{ base: "6xl", md: "8xl" }} fontWeight="bold" lineHeight="1.1" mb={6} color="white">
              Welcome to Silk & Shine
            </Text>
            
            <Text className="hero-description" fontSize="lg" mb={8} maxW="500px" mx="auto" color="rgba(255, 255, 255, 0.9)">
              Transform your look with our premium beauty treatments. Expert stylists, luxury experience, stunning results.
            </Text>

            {/* Button scrolls down to services section */}
            <Button 
              as="a"
              href="#get-started"
              className="hero-cta" 
              size="lg"
              textDecoration="none"
              _hover={{ bg: "#8b5cf6", color: "white", textDecoration: "none" }}
            >
              Unlock Your Glow
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
      
      {/* Get Started Section for Guests */}
      <Box 
        id="get-started"
        className="services-preview" 
        position="relative"
        minH="600px"
        w="100vw" 
        ml="calc(-50vw + 50%)"
        overflow="hidden"
      >
        {/* Background Image */}
        <Image 
          src={require("../assets/images/ServicesBG.webp")}
          alt="Beauty spa treatment"
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
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={2}
        />
        
        {/* Content Overlay */}
        <Flex 
          position="relative" 
          zIndex={3} 
          minH="600px" 
          align="center" 
          justify="center"
          px={8}
        >
          <Box textAlign="center" maxW="900px" mx="auto">
            
            <Text className="section-title" fontSize={{ base: "5xl", md: "7xl" }} fontWeight="bold" mb={6} color="white">
              Ready to Transform Your Beauty Journey?
            </Text>
            
            <Text className="section-description" fontSize="lg" mb={8} lineHeight="1.6" color="rgba(255, 255, 255, 0.9)" maxW="800px" mx="auto">
              Join thousands of satisfied clients and discover personalized beauty treatments designed just for you.
            </Text>
            
            <Link href="/login" _hover={{ textDecoration: "none" }}>
              <Button className="section-cta" size="lg" mb={4} bg="black" color="white" _hover={{ bg: "#a78bfa", borderColor: "#a78bfa" }} _focus={{ boxShadow: "none", borderColor: "#a78bfa" }} border="1px solid black">
                Get Started
              </Button>
            </Link>
            
            <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
              Don't have an account? <Link href="/register" color="#a78bfa" _hover={{ color: "#8b5cf6" }} textDecoration="underline">Sign up</Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}