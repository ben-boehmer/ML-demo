import React from "react" 
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import DecisionBox from "./components/ui/DecisionBox";
import ClassifierBox from "./components/ui/ClassifierBox";
import ChatbotBox from "./components/ui/ChatbotBox";

export default function MLFrontend() {
  return (
    <main className="p-4 max-w-4xl mx-auto grid grid-cols-1 gap-6">
      <Card className="p-4">
        <CardContent>
          <DecisionBox />
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent>
          <ClassifierBox />
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent>
          <ChatbotBox />
        </CardContent>
      </Card>
    </main>
  );
}
