import { Box, Flex, Text, Button, Grid, GridItem, Image } from "@chakra-ui/react";
import Navigation from "./navigation.js";
import "../styles/home.css";

export default function GuestAbout() {
  return (
    <Box minH="100vh" sx={{ scrollBehavior: "smooth" }}>
      <Navigation showLogout={false} />

      {/* Hero Section */}
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

        {/* Dark Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.4)"
          zIndex={2}
        />

        {/* Hero Content */}
        <Flex
          position="relative"
          zIndex={3}
          minH="100vh"
          align="center"
          justify="center"
          px={8}
        >
          <Box textAlign="center" maxW="800px" mx="auto" mt={20}>
            <Text
              className="hero-title"
              fontSize={{ base: "5xl", md: "7xl" }}
              fontWeight="bold"
              mb={6}
              color="white"
            >
              About Silk & Shine
            </Text>

            <Text
              className="hero-description"
              fontSize="lg"
              mb={8}
              maxW="500px"
              mx="auto"
              color="rgba(255, 255, 255, 0.9)"
            >
              At Silk & Shine, we believe beauty is an experience. Our mission is to provide top-quality salon and spa treatments in a luxurious environment, helping you look and feel your absolute best.
            </Text>

            <Button
              as="a"
              href="#mission-section"
              className="hero-cta"
              size="lg"
              textDecoration="none"
              _hover={{ bg: "#8b5cf6", color: "white", textDecoration: "none" }}
            >
              Our Mission
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

      {/* Mission Section */}
      <Box id="mission-section" className="mission-section" py={20} px={8}>
        <Box maxW="1400px" mx="auto">
          <Grid templateColumns="1fr 1fr" gap={16} alignItems="center">
            
            {/* Left Image */}
            <GridItem>
              <Image
                src={require("../assets/images/ServicesBG.webp")}
                alt="Our Mission"
                h="400px"
                w="full"
                objectFit="cover"
                borderRadius="lg"
              />
            </GridItem>

            {/* Right Text Content */}
            <GridItem>
              <Box textAlign="right" ml="auto">
                <Text className="section-subtitle" fontSize="sm" fontWeight="medium" mb={4}>
                  OUR MISSION
                </Text>

                <Text className="section-title" fontSize="4xl" fontWeight="bold" mb={6}>
                  Excellence in Beauty & Wellness
                </Text>

                <Text className="section-description" fontSize="lg" mb={8} lineHeight="1.6">
                  Our mission is to deliver professional beauty treatments using premium products and expert techniques.
                  We strive to create a comfortable, welcoming space where every client feels valued and pampered.
                </Text>
                
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
