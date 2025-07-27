const axios = require('axios');

async function testGenerateReport() {
    try {
        console.log('🧪 Testing generate-report API...');
        
        const testData = {
            messages: [
                { role: 'user', text: 'Hello, I have been experiencing severe headaches for the past 3 days.' },
                { role: 'assistant', text: 'I understand you are experiencing headaches. Can you describe the pain?' },
                { role: 'user', text: 'It is a throbbing pain on the right side of my head.' },
                { role: 'assistant', text: 'That sounds concerning. Are you currently taking any medications?' },
                { role: 'user', text: 'I take ibuprofen but it is not helping.' }
            ],
            sessionDetail: {
                sessionId: 'test-session-123',
                notes: 'Severe headache complaint',
                selectedDoctor: {
                    specialist: 'Neurologist'
                },
                CreatedOn: new Date().toISOString()
            },
            sessionId: 'test-session-123'
        };

        console.log('📤 Sending request to localhost:3001/api/generate-report');
        
        const response = await axios.post('http://localhost:3001/api/generate-report', testData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Success! Response status:', response.status);
        console.log('📄 Response data:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('❌ Error:', error.response?.status, error.response?.statusText);
        console.error('💥 Error details:', error.response?.data);
        console.error('🔍 Full error:', error.message);
    }
}

testGenerateReport();
