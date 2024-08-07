import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent", rating: 4.5, image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Docile", rating: 4.2, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Intelligent, Independent", rating: 4.8, image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", origin: "United States", temperament: "Energetic, Playful, Curious", rating: 4.6, image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "Scottish Fold", origin: "Scotland", temperament: "Sweet-tempered, Intelligent, Soft-voiced", rating: 4.3, image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const CatCard = ({ breed, origin, temperament, rating, image }) => (
  <Card className="mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
    <CardHeader>
      <img src={image} alt={breed} className="w-full h-48 object-cover rounded-t-lg" />
      <CardTitle className="flex items-center justify-between mt-2">
        {breed}
        <Badge variant="secondary" className="ml-2">
          <Star className="w-4 h-4 mr-1 inline" />
          {rating.toFixed(1)}
        </Badge>
      </CardTitle>
      <CardDescription>Origin: {origin}</CardDescription>
    </CardHeader>
    <CardContent>
      <p><strong>Temperament:</strong> {temperament}</p>
      <div className="mt-2">
        <Progress value={rating * 20} className="w-full" />
      </div>
    </CardContent>
  </Card>
);

const FactCard = ({ fact }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
      <CardContent className="p-6">
        <p className="text-lg font-semibold">{fact}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the meow.",
  "The first cat in space was French. She was named Felicette.",
  "Cats can jump up to six times their length.",
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for your love!",
      description: `You've liked cats ${likes + 1} times.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-6 flex items-center justify-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-2 text-pink-500" /> All About Cats
        </motion.h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img src={breed.image} alt={breed.name} className="w-full h-full object-cover rounded-lg" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <AnimatePresence mode="wait">
          <FactCard key={currentFactIndex} fact={catFacts[currentFactIndex]} />
        </AnimatePresence>

        <Tabs defaultValue="about" className="mb-6 mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-purple-700">Fascinating Felines</CardTitle>
                <CardDescription>Discover the world of cats</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-gray-700 mb-4">
                  Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
                </p>
                <h3 className="text-2xl font-semibold mb-3 text-purple-600">Characteristics of Cats</h3>
                <ul className="list-none mb-4 text-gray-700">
                  {["Excellent hunters with sharp claws and teeth", "Flexible bodies and quick reflexes", "Keen senses, especially their night vision", "Soft fur and a variety of coat patterns", "Communicate through meowing, purring, and body language"].map((trait, index) => (
                    <motion.li 
                      key={index}
                      className="mb-2 flex items-center"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Badge variant="outline" className="mr-2 bg-pink-100"><Paw className="w-4 h-4" /></Badge>
                      {trait}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catBreeds.map((breed, index) => (
                <motion.div
                  key={breed.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CatCard {...breed} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center items-center space-x-4 mb-6">
          <Button 
            variant="outline" 
            onClick={handleLike}
            className="flex items-center bg-pink-500 text-white hover:bg-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="mr-2 h-4 w-4" /> Like
          </Button>
          <span className="text-2xl font-bold text-pink-500">{likes}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show your love for cats!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <motion.p 
          className="text-lg text-gray-700 text-center italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          "Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and personality."
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
