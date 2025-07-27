import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { sessionDetail } from '../medical-agent/[sessionId]/page';
import axios from 'axios';
import { toast } from 'sonner';

type props = {
    record: sessionDetail;
}

function ViewReportDialog({record}: props) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(record);
    
    // Check if we have conversation data stored
    const hasConversation = currentRecord.conversation && Array.isArray(currentRecord.conversation) && currentRecord.conversation.length > 0;
    
    // Function to generate a sample report for testing
    const generateSampleReport = async () => {
        console.log('🧪 Generating sample report...');
        setIsGenerating(true);
        try {
            // Sample conversation for testing
            const sampleMessages = [
                { role: 'user', text: 'Hello, I have been experiencing severe headaches for the past 3 days.' },
                { role: 'assistant', text: 'I understand you are experiencing headaches. Can you describe the pain? Is it throbbing, sharp, or dull?' },
                { role: 'user', text: 'It is a throbbing pain on the right side of my head. It gets worse with bright lights.' },
                { role: 'assistant', text: 'That sounds concerning. Are you currently taking any medications?' },
                { role: 'user', text: 'I take ibuprofen 400mg twice daily, but it is not helping much.' },
                { role: 'assistant', text: 'Have you experienced nausea or vision changes with these headaches?' },
                { role: 'user', text: 'Yes, I feel nauseous and sometimes see flashing lights.' },
                { role: 'assistant', text: 'Based on your symptoms, I recommend seeking immediate medical attention as these could be signs of a migraine or other serious condition.' }
            ];

            console.log('🔥 Calling API with sample data...');
            const result = await axios.post('/api/generate-report', {
                messages: sampleMessages,
                sessionDetail: currentRecord,
                sessionId: currentRecord.sessionId,
            });

            console.log('📊 API Response:', result.data);

            if (result.data.success) {
                // Update the current record with the generated report
                setCurrentRecord({
                    ...currentRecord,
                    report: result.data.report,
                    conversation: sampleMessages
                });
                toast.success('🎉 AI medical report generated successfully!');
                console.log('✅ Report generated successfully!');
            } else {
                toast.error('❌ Failed to generate report: ' + (result.data.error || 'Unknown error'));
            }
        } catch (error: any) {
            console.error('💥 Error generating sample report:', error);
            toast.error('Failed to generate sample report: ' + (error.response?.data?.error || error.message || 'Unknown error'));
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
        <Dialog>
            <DialogTrigger>
                <Button variant="link" size="sm" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                    View Report
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[90vh] overflow-y-auto bg-white dark:bg-black shadow-lg p-6 border-gray-200 dark:border-gray-800'>
                <DialogHeader>
                <DialogTitle asChild>
                    <h2 className="text-center text-4xl text-black dark:text-white">Medical AI Voice Agent Report</h2>
                </DialogTitle>
                <DialogDescription asChild>
                    <div className='space-y-6 text-gray-800 dark:text-gray-200 text-sm'>
                        {/* Test Button - Make it more prominent */}
                        {!currentRecord.report && (
                            <div className='text-center py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 shadow-lg'>
                                <div className='text-6xl mb-3'>🤖</div>
                                <h3 className='font-bold text-black dark:text-white text-xl mb-2'>AI Report Demo</h3>
                                <p className='text-gray-700 dark:text-gray-300 mb-4 text-base'>This session doesn't have an AI-generated report yet.<br/>Click below to see MediVox AI in action!</p>
                                <Button 
                                    onClick={generateSampleReport} 
                                    disabled={isGenerating}
                                    className='bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-bold py-3 px-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all'
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="animate-spin mr-2">⚡</div>
                                            Generating AI Report...
                                        </>
                                    ) : (
                                        <>🚀 Generate AI Medical Report</>
                                    )}
                                </Button>
                                <p className='text-gray-600 dark:text-gray-400 text-xs mt-2'>Powered by AI Technology</p>
                            </div>
                        )}

                        {/* Section 1: Session Info */}
                        <div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
                            <h2 className='font-bold text-black dark:text-white text-lg mb-3'>Session Information</h2>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <span className="font-bold text-black dark:text-white">Doctor Specialization:</span> <span className="text-gray-700 dark:text-gray-300">{currentRecord.selectedDoctor?.specialist || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-black dark:text-white">Consultation Date:</span> <span className="text-gray-700 dark:text-gray-300">{
                                        (() => {
                                            const date = new Date(currentRecord.CreatedOn);
                                            return date.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            });
                                        })()
                                    }</span>
                                </div>
                                <div>
                                    <span className="font-bold text-black dark:text-white">Session ID:</span> <span className="text-gray-700 dark:text-gray-300">{currentRecord.sessionId}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-black dark:text-white">Time Since:</span> <span className="text-gray-700 dark:text-gray-300">{
                                        (() => {
                                            const now = new Date();
                                            const sessionDate = new Date(currentRecord.CreatedOn);
                                            const diffTime = Math.abs(now.getTime() - sessionDate.getTime());
                                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                            return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
                                        })()
                                    }</span>
                                </div>
                            </div>
                            
                            {/* Conversation Status */}
                            <div className='mt-4 p-3 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700'>
                                <div className='flex items-center gap-2'>
                                    <span className={hasConversation ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                                        {hasConversation ? '✓' : '⚠️'}
                                    </span>
                                    <span className='font-medium text-sm text-black dark:text-white'>
                                        {hasConversation 
                                            ? `Conversation saved (${currentRecord.conversation?.length || 0} messages)` 
                                            : 'No conversation data saved yet'
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Chief Complaint */}
                        <div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
                            <h2 className='font-bold text-black dark:text-white text-lg mb-3'>Chief Complaint</h2>
                            <p className='bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-md text-gray-700 dark:text-gray-300'>
                                {currentRecord.notes || 'No chief complaint recorded'}
                            </p>
                        </div>

                        {/* Section 3: Summary of Conversation */}
                        <div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
                            <h2 className='font-bold text-black dark:text-white text-lg mb-3'>🤖 AI-Generated Conversation Summary</h2>
                            <div className='bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-md'>
                                {currentRecord.report?.conversationSummary ? (
                                    <div>
                                        <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{currentRecord.report.conversationSummary}</p>
                                        <p className='text-xs text-green-600 dark:text-green-400 mt-2 italic'>✓ Generated by AI from actual conversation</p>
                                    </div>
                                ) : (
                                    <div className='text-center py-4'>
                                        <p className='italic text-gray-500 dark:text-gray-400 mb-2'>No AI report generated yet</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400'>Complete a voice session to generate AI analysis</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 4: Symptoms */}
                        <div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
                            <h2 className='font-bold text-black dark:text-white text-lg mb-3'>🔍 AI-Identified Symptoms</h2>
                            <div className='bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-md'>
                                {currentRecord.report?.symptoms ? (
                                    <div>
                                        <ul className='list-disc list-inside space-y-2'>
                                            {Array.isArray(currentRecord.report.symptoms) ? 
                                                currentRecord.report.symptoms.map((symptom: string, index: number) => (
                                                    <li key={index} className='leading-relaxed text-gray-700 dark:text-gray-300'>{symptom}</li>
                                                )) : 
                                                <li className='leading-relaxed text-gray-700 dark:text-gray-300'>{currentRecord.report.symptoms}</li>
                                            }
                                        </ul>
                                        <p className='text-xs text-green-600 dark:text-green-400 mt-2 italic'>✓ Extracted by AI from conversation</p>
                                    </div>
                                ) : (
                                    <div className='text-center py-4'>
                                        <p className='italic text-gray-500 dark:text-gray-400 mb-2'>No symptoms analysis available</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400'>AI will identify symptoms after voice session</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 5: Duration and Severity */}
                        <div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
                            <h2 className='font-bold text-black dark:text-white text-lg mb-3'>📊 AI Assessment: Duration & Severity</h2>
                            <div className='bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-md'>
                                {currentRecord.report?.duration || currentRecord.report?.severity ? (
                                    <div>
                                        <div className='grid grid-cols-2 gap-4 mb-3'>
                                            <div>
                                                <span className="font-bold text-black dark:text-white">Duration:</span> 
                                                <span className='ml-2 text-gray-700 dark:text-gray-300'>{currentRecord.report?.duration || 'Not specified'}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-black dark:text-white">Severity:</span> 
                                                <span className='ml-2 text-gray-700 dark:text-gray-300'>{currentRecord.report?.severity || 'Not specified'}</span>
                                            </div>
                                        </div>
                                        {currentRecord.report?.additionalDetails && (
                                            <div className='mt-3 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded'>
                                                <span className="font-bold text-black dark:text-white">AI Additional Analysis:</span>
                                                <p className='mt-1 leading-relaxed text-gray-700 dark:text-gray-300'>{currentRecord.report.additionalDetails}</p>
                                            </div>
                                        )}
                                        <p className='text-xs text-green-600 dark:text-green-400 mt-2 italic'>✓ AI-powered assessment</p>
                                    </div>
                                ) : (
                                    <div className='text-center py-4'>
                                        <p className='italic text-gray-500 dark:text-gray-400 mb-2'>No duration/severity analysis available</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400'>AI will assess after voice session</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 6: Medications Mentioned */}
                        <div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
                            <h2 className='font-bold text-black dark:text-white text-lg mb-3'>💊 AI-Detected Medications</h2>
                            <div className='bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-md'>
                                {currentRecord.report?.medications ? (
                                    <div>
                                        <h4 className='font-semibold mb-3 text-black dark:text-white'>Medications Mentioned in Conversation:</h4>
                                        <ul className='list-disc list-inside space-y-2'>
                                            {Array.isArray(currentRecord.report.medications) ? 
                                                currentRecord.report.medications.map((medication: string, index: number) => (
                                                    <li key={index} className='leading-relaxed text-gray-700 dark:text-gray-300'>{medication}</li>
                                                )) : 
                                                <li className='leading-relaxed text-gray-700 dark:text-gray-300'>{currentRecord.report.medications}</li>
                                            }
                                        </ul>
                                        <p className='text-xs text-green-600 dark:text-green-400 mt-2 italic'>✓ AI-extracted from conversation</p>
                                    </div>
                                ) : (
                                    <div className='text-center py-4'>
                                        <p className='italic text-gray-500 dark:text-gray-400 mb-2'>No medications detected</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400'>AI will extract medication info from conversation</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 7: Recommendations */}
                        <div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
                            <h2 className='font-bold text-black dark:text-white text-lg mb-3'>🤖 AI Medical Recommendations</h2>
                            <div className='bg-gray-50 dark:bg-gray-900 p-4 rounded-md border-l-4 border-black dark:border-white'>
                                {currentRecord.report?.recommendations ? (
                                    <div>
                                        <div className='mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-600'>
                                            <span className='mr-2'>🧠</span>
                                            Generated by AI Medical Assistant based on actual conversation analysis
                                        </div>
                                        {Array.isArray(currentRecord.report.recommendations) ? (
                                            <ul className='space-y-3'>
                                                {currentRecord.report.recommendations.map((recommendation: string, index: number) => (
                                                    <li key={index} className='flex items-start p-2 bg-white dark:bg-black rounded border border-gray-200 dark:border-gray-700'>
                                                        <span className='font-bold text-black dark:text-white mr-3 text-lg'>•</span>
                                                        <span className='leading-relaxed flex-1 text-gray-700 dark:text-gray-300'>{recommendation}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className='p-3 bg-white dark:bg-black rounded border border-gray-200 dark:border-gray-700'>
                                                <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{currentRecord.report.recommendations}</p>
                                            </div>
                                        )}
                                        <p className='text-xs text-green-600 dark:text-green-400 mt-3 italic'>✓ Personalized AI recommendations</p>
                                    </div>
                                ) : (
                                    <div className='text-center py-6'>
                                        <div className='mb-3'>
                                            <span className='text-4xl'>🤖</span>
                                        </div>
                                        <p className='italic text-gray-500 dark:text-gray-400 mb-2'>No AI recommendations generated yet</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400'>Complete a voice session for personalized AI recommendations</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 8: Conversation Transcript */}
                        {hasConversation && currentRecord.conversation && (
                            <div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
                                <h2 className='font-bold text-black dark:text-white text-lg mb-3'>💬 Conversation Transcript</h2>
                                <div className='bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-md max-h-60 overflow-y-auto'>
                                    <div className='space-y-3'>
                                        {currentRecord.conversation.slice(0, 10).map((msg: any, index: number) => (
                                            <div key={index} className={`p-2 rounded border ${
                                                msg.role === 'user' 
                                                    ? 'bg-gray-100 dark:bg-gray-800 ml-4 border-gray-200 dark:border-gray-600' 
                                                    : 'bg-gray-200 dark:bg-gray-700 mr-4 border-gray-300 dark:border-gray-500'
                                            }`}>
                                                <div className='font-semibold text-xs mb-1 uppercase text-gray-600 dark:text-gray-400'>
                                                    {msg.role === 'user' ? '👤 Patient' : '🤖 AI Assistant'}
                                                </div>
                                                <div className='text-sm text-gray-800 dark:text-gray-200'>{msg.text}</div>
                                            </div>
                                        ))}
                                        {currentRecord.conversation.length > 10 && (
                                            <div className='text-center text-xs text-gray-500 dark:text-gray-400 italic'>
                                                ... and {currentRecord.conversation.length - 10} more messages
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Disclaimer */}
                        <div className='bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded-md'>
                            <p className='text-center font-semibold text-gray-800 dark:text-gray-200'>
                                ⚠️ This report is generated by an AI Medical Assistant for informational purposes only. 
                                Please consult with a qualified healthcare professional for proper medical diagnosis and treatment.
                            </p>
                        </div>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        
        </div>
    );
}

export default ViewReportDialog;