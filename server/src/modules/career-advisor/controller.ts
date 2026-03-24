import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const SYSTEM_PROMPT = `You are a professional placement company expert for 'PlaceBridge', a premium student career portal. 
Your goal is to help students (like Michael Mims) overcome their skill gaps, prepare for interviews, and optimize their career paths. 

Michael Mims Profile Context:
- Role: IT Support Manager
- University: Locust Valley University
- Graduate: 2018
- Core Skills: Python, Ruby, C#, HTML
- About: Detailed support desk technician with over five years of industry success.

Tone & Style:
- Professional, encouraging, and data-driven.
- Provide actionable advice and clear learning paths.
- Keep responses concise but impactful.
- If asked about specific rejections (like Airbnb, Stripe, or Meta), reference the feedback provided in their Skill Gap analysis section.

Constraints:
- Only discuss career, placement, interviews, and technical skills.
- If a user asks something unrelated, politely steer them back to their career development.`;

export class CareerAdvisorController {
  static async chat(req: Request, res: Response) {
    try {
      const { message } = req.body;
      const lowerMsg = message.toLowerCase();

      // Realistic Mock Logic for Michael Mims
      let responseText = "That's a great question, Michael! As your PlaceBridge advisor, I recommend focusing on your core strengths in IT Support while bridging into the 'missing pieces' like System Design. Would you like me to highlight specific resources for your current roadmaps?";

      if (lowerMsg.includes('stripe') || lowerMsg.includes('system design') || lowerMsg.includes('caching')) {
        responseText = "Based on your technical loop at Stripe, I strongly recommend diving deeper into **Distributed Caching** and **Database Sharding**. Your IT Support background is perfect for understanding infrastructure, but modern backend roles at places like Stripe demand high-scale data consistency knowledge. Check out the 'Redis Mastery' link in your Stripe roadmap below!";
      } else if (lowerMsg.includes('airbnb') || lowerMsg.includes('airflow') || lowerMsg.includes('data')) {
        responseText = "For your Airbnb roadmap, the priority is **Data Orchestration**. Since you're already proficient in Python and Ruby, learning Airflow's Pythonic DAG structure will be smooth. I've updated your Skill Gap section with a '2-week fast-track' guide to get you interview-ready.";
      } else if (lowerMsg.includes('meta') || lowerMsg.includes('react') || lowerMsg.includes('performance')) {
        responseText = "I see you're asking about Frontend performance. For Meta, they really value **React Profiling** and **Accessibility**. Your current roadmap has 2 steps remaining. Once you complete the 'Accessibility Audit', you'll be in the top 15% of candidates for their upcoming Solutions Architect roles.";
      } else if (lowerMsg.includes('skill gap') || lowerMsg.includes('my gaps') || lowerMsg.includes('missing')) {
        responseText = "Your current analysis shows 3 primary areas for growth: **System Design** (from Stripe), **Data Orchestration** (from Airbnb), and **Frontend Performance** (from Meta). You've already made 25% progress on your roadmaps! I recommend tackling the 'Airflow Basics' first as it aligns most with your existing scripting skills.";
      } else if (lowerMsg.includes('prep') || lowerMsg.includes('interview') || lowerMsg.includes('prepare')) {
        responseText = "Excellent timing! You have a technical round with Nvidia in 2 days. Head over to the **'Interview Prep Guide'** section in the side menu. I've prepared a custom guide for you there covering Graphics fundamentals and common behavioral questions based on your IT Support leadership experience.";
      } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
        responseText = "Hello Michael! I am your AI Career Advisor. I've reviewed your latest rejections and current progress. How can I help you accelerate your growth today? We can discuss your System Design gaps or your progress on the Data Orchestration roadmap.";
      }

      // Simulate a small network delay for "realism"
      await new Promise(resolve => setTimeout(resolve, 1200));

      return res.status(200).json({ text: responseText });
    } catch (error: any) {
      console.error('Mock Advisor Error:', error);
      return res.status(500).json({ error: 'Failed to get response from Advisor.' });
    }
  }
}
