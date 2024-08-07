import { useState, useEffect, useRef } from "react";
import { Cat, Heart, Info, Paw, Star, ChevronLeft, ChevronRight, Sparkles, Camera, Download } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toPng } from 'html-to-image';

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent", rating: 4.5, image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Docile", rating: 4.2, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Intelligent, Independent", rating: 4.8, image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", origin: "United States", temperament: "Energetic, Playful, Curious", rating: 4.6, image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "Scottish Fold", origin: "Scotland", temperament: "Sweet-tempered, Intelligent, Soft-voiced", rating: 4.3, image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
  { name: "Sphynx", origin: "Canada", temperament: "Energetic, Mischievous, Intelligent", rating: 4.7, image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  { name: "Russian Blue", origin: "Russia", temperament: "Gentle, Quiet, Intelligent", rating: 4.4, image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Russian_Blue_001.gif" },
];

const CatQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const questions = [
    {
      question: "Which cat breed is known for its lack of fur?",
      options: ["Persian", "Sphynx", "Maine Coon", "Siamese"],
      correctAnswer: "Sphynx"
    },
    {
      question: "What is a group of cats called?",
      options: ["Herd", "Pack", "Clowder", "Flock"],
      correctAnswer: "Clowder"
    },
    {
      question: "Which cat breed is known for its folded ears?",
      options: ["Scottish Fold", "Russian Blue", "Bengal", "Siamese"],
      correctAnswer: "Scottish Fold"
    }
  ];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cat Quiz</CardTitle>
        <CardDescription>Question {currentQuestion + 1} of {questions.length}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h3>
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full justify-start text-left"
              variant="outline"
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CatCard = ({ breed, origin, temperament, rating, image }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="mb-4 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg">
      <CardHeader className="relative p-0">
        <img src={image} alt={breed} className="w-full h-56 object-cover" />
        <div className="absolute top-0 right-0 m-2">
          <Badge variant="secondary" className="bg-purple-500 text-white">
            <Star className="w-4 h-4 mr-1 inline" />
            {rating.toFixed(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-2xl font-bold text-purple-700">{breed}</CardTitle>
        <CardDescription className="text-pink-600">Origin: {origin}</CardDescription>
        <p className="mt-2"><strong>Temperament:</strong> {temperament}</p>
        <div className="mt-3">
          <Progress value={rating * 20} className="w-full h-2 bg-pink-200" indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>
      </CardContent>
    </Card>
  </motion.div>
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
  const [showAlert, setShowAlert] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [catName, setCatName] = useState("");
  const { toast } = useToast();
  const cardRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    });
    toast({
      title: "Thanks for your love!",
      description: `You've liked cats ${likes + 1} times.`,
      duration: 3000,
    });
    if (likes + 1 === 10) {
      setShowAlert(true);
    }
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
    setShowQuiz(false);
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score} out of 3!`,
      duration: 5000,
    });
  };

  const handleDownload = async () => {
    if (cardRef.current === null) {
      return
    }
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, })
      const link = document.createElement('a')
      link.download = 'my-cat-card.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error(err)
    }
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

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-4">Create Your Cat Card</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Your Cat Card</DialogTitle>
              <DialogDescription>
                Enter your cat's name to create a personalized cat card.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleDownload} disabled={!catName}>Download Cat Card</Button>
          </DialogContent>
        </Dialog>

        <div ref={cardRef} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">{catName || "Your Cat"}</h2>
          <img src="https://placekitten.com/300/200" alt="Random cat" className="w-full h-auto rounded-lg mb-4" />
          <p className="text-gray-600">A purr-fect companion!</p>
        </div>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <img src={breed.image} alt={breed.name} className="w-full h-full object-cover" />
                    </CardContent>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-white text-xl font-bold">{breed.name}</h3>
                    </div>
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="characteristics">
                    <AccordionTrigger className="text-2xl font-semibold text-purple-600">Characteristics of Cats</AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="outline" 
              onClick={handleLike}
              className="flex items-center bg-pink-500 text-white hover:bg-pink-600 transition-all duration-300"
            >
              <Heart className="mr-2 h-4 w-4" /> Like
            </Button>
          </motion.div>
          <motion.span 
            className="text-2xl font-bold text-pink-500"
            key={likes}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={controls}
          >
            {likes}
          </motion.span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Button variant="outline" size="icon" className="bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300">
                    <Info className="h-4 w-4" />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show your love for cats!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {showAlert && (
          <Alert className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Wow! You're a true cat lover!</AlertTitle>
            <AlertDescription>
              You've liked cats 10 times. Keep spreading the love!
            </AlertDescription>
          </Alert>
        )}

        {!showQuiz && quizScore === null && (
          <Button onClick={() => setShowQuiz(true)} className="mb-6">
            Take Cat Quiz
          </Button>
        )}

        {showQuiz && (
          <CatQuiz onComplete={handleQuizComplete} />
        )}

        {quizScore !== null && (
          <Alert className="mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Quiz Results</AlertTitle>
            <AlertDescription>
              You scored {quizScore} out of 3! {quizScore === 3 ? "Purr-fect!" : "Keep learning about cats!"}
            </AlertDescription>
          </Alert>
        )}

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
