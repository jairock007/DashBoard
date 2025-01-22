import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EmailBuilder = () => {
    const [emailConfig, setEmailConfig] = useState({
        title: '',
        content: '',
        imageUrl: '',
        footer: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmailConfig(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);

        // Create a local URL for the uploaded image
        const imageUrl = URL.createObjectURL(file);
        setEmailConfig(prev => ({
            ...prev,
            imageUrl: imageUrl
        }));

        setLoading(false);
    };

    const removeImage = () => {
        if (emailConfig.imageUrl) {
            // Clean up the object URL if it exists
            URL.revokeObjectURL(emailConfig.imageUrl);
        }
        setEmailConfig(prev => ({
            ...prev,
            imageUrl: ''
        }));
    };

    const handleSubmit = () => {
        try {
            setLoading(true);
            setError(null);

            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${emailConfig.title}</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            line-height: 1.6; 
                            max-width: 600px; 
                            margin: 0 auto; 
                            padding: 20px;
                            color: #333;
                        }
                        img { 
                            max-width: 100%; 
                            height: auto;
                            border-radius: 8px;
                        }
                        .footer { 
                            margin-top: 40px; 
                            padding-top: 20px; 
                            border-top: 1px solid #e2e8f0; 
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <h1>${emailConfig.title}</h1>
                    ${emailConfig.imageUrl ? `<img src="${emailConfig.imageUrl}" alt="Email image">` : ''}
                    <div>${emailConfig.content}</div>
                    <div class="footer">${emailConfig.footer}</div>
                </body>
                </html>
            `;

            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'email-template.html';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating template:', error);
            setError('Failed to generate template');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor Panel */}
                <Card className="shadow-lg">
                    <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="text-xl font-semibold text-gray-800">Email Editor</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={emailConfig.title}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter email title..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    name="content"
                                    value={emailConfig.content}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter email content..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Featured Image</label>
                                <div className="flex flex-col gap-4">
                                    {!emailConfig.imageUrl ? (
                                        <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <div className="flex flex-col items-center space-y-2">
                                                <Upload className="w-6 h-6 text-gray-600" />
                                                <span className="text-sm text-gray-600">
                                                    {loading ? 'Uploading...' : 'Click to upload image'}
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </label>
                                    ) : (
                                        <div className="relative w-full">
                                            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                                                <img
                                                    src={emailConfig.imageUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                                                    }}
                                                />
                                                <button
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <label className="mt-2 flex items-center justify-center px-4 py-2 text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                                                <Upload className="w-4 h-4 mr-2" />
                                                Change Image
                                                <input
                                                    type="file"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    accept="image/*"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Footer Text</label>
                                <input
                                    type="text"
                                    name="footer"
                                    value={emailConfig.footer}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter footer text..."
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {loading ? 'Processing...' : 'Save & Download Template'}
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Preview Panel */}
                <Card className="shadow-lg">
                    <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="text-xl font-semibold text-gray-800">Live Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="border rounded-lg p-6 min-h-[600px] bg-white shadow-inner overflow-auto">
                            <div className="prose max-w-none">
                                <h1 className="text-2xl font-bold mb-4">{emailConfig.title || 'Email Title'}</h1>
                                {emailConfig.imageUrl && (
                                    <div className="mb-4">
                                        <img
                                            src={emailConfig.imageUrl}
                                            alt="Email featured image"
                                            className="w-full rounded-lg"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="whitespace-pre-wrap mb-4">
                                    {emailConfig.content || 'Email content will appear here...'}
                                </div>
                                <div className="text-sm text-gray-600 border-t pt-4">
                                    {emailConfig.footer || 'Footer text will appear here...'}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EmailBuilder