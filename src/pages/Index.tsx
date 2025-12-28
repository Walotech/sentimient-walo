import { useState } from "react";
import SentimentHeader from "@/components/SentimentHeader";
import SentimentForm from "@/components/SentimentForm";
import SentimentResult, { SentimentType } from "@/components/SentimentResult";

interface AnalysisResult {
  sentiment: SentimentType;
  confidence: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Simulated sentiment analysis (will be replaced with real ML backend)
  const analyzeSentiment = (text: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simple mock analysis based on keywords
      const lowerText = text.toLowerCase();
      
      const positiveWords = ["feliz", "amor", "excelente", "genial", "maravilloso", "increíble", "bueno", "mejor", "alegría", "gracias", "perfecto", "fantástico", "hermoso", "great", "good", "happy", "love", "excellent", "amazing"];
      const negativeWords = ["triste", "odio", "terrible", "malo", "peor", "horrible", "fatal", "desastre", "miedo", "dolor", "angustia", "sad", "bad", "hate", "terrible", "awful", "angry", "disappointed"];
      
      let positiveScore = 0;
      let negativeScore = 0;
      
      positiveWords.forEach(word => {
        if (lowerText.includes(word)) positiveScore++;
      });
      
      negativeWords.forEach(word => {
        if (lowerText.includes(word)) negativeScore++;
      });
      
      let sentiment: SentimentType;
      let confidence: number;
      
      if (positiveScore > negativeScore) {
        sentiment = "positive";
        confidence = Math.min(95, 60 + positiveScore * 10);
      } else if (negativeScore > positiveScore) {
        sentiment = "negative";
        confidence = Math.min(95, 60 + negativeScore * 10);
      } else {
        sentiment = "neutral";
        confidence = Math.min(90, 50 + Math.random() * 30);
      }
      
      setResult({ sentiment, confidence: Math.round(confidence) });
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SentimentHeader />

      {/* Main Content */}
      <main className="container max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div 
          className="animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {result ? (
            <SentimentResult
              sentiment={result.sentiment}
              confidence={result.confidence}
              onReset={handleReset}
            />
          ) : (
            <div className="bg-card rounded-2xl p-6 md:p-10 shadow-card">
              <SentimentForm onAnalyze={analyzeSentiment} isLoading={isLoading} />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <footer className="mt-12 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p>
            Powered by Machine Learning • Análisis de texto en tiempo real
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
