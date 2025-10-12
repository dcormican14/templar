'use client';

import React from 'react';
import { Icon, Button } from '../components/atoms';
import { useCSSVariables } from '../providers';

export function ContactPage() {
  const cssVars = useCSSVariables();

  return (
    <div className="max-w-2xl mx-auto">
      <div 
        className="text-center py-20"
        style={{ color: cssVars.foreground }}
      >
        <Icon name="MessageText" size="xl" className="mx-auto mb-6" style={{ color: cssVars.primary }} />
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: cssVars.primary }}
        >
          Get in Touch
        </h1>
        <p 
          className="text-lg mb-12"
          style={{ color: cssVars.foregroundAccent }}
        >
          Have questions, feedback, or want to contribute? We'd love to hear from you!
        </p>
        
        <div className="grid gap-6">
          <div 
            className="p-6 rounded-lg border text-left"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Github" size="lg" className="mb-4" style={{ color: cssVars.foreground }} />
            <h3 className="text-xl font-semibold mb-2">GitHub Repository</h3>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Find the source code, report issues, and contribute to the project
            </p>
            <Button 
              variant="outline" 
              size="sm"
              icon={<Icon name="OpenInWindow" size="sm" />}
            >
              View on GitHub
            </Button>
          </div>
          
          <div 
            className="p-6 rounded-lg border text-left"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="ChatBubbleEmpty" size="lg" className="mb-4" style={{ color: cssVars.info }} />
            <h3 className="text-xl font-semibold mb-2">Community Discussion</h3>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              Join the community discussions, ask questions, and share your creations
            </p>
            <Button 
              variant="outline" 
              size="sm"
              icon={<Icon name="User" size="sm" />}
            >
              Join Community
            </Button>
          </div>
          
          <div 
            className="p-6 rounded-lg border text-left"
            style={{ 
              backgroundColor: cssVars.card,
              borderColor: cssVars.border 
            }}
          >
            <Icon name="Mail" size="lg" className="mb-4" style={{ color: cssVars.success }} />
            <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
            <p className="mb-4" style={{ color: cssVars.foregroundAccent }}>
              For direct inquiries, collaboration opportunities, or enterprise support
            </p>
            <Button 
              variant="outline" 
              size="sm"
              icon={<Icon name="Send" size="sm" />}
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}