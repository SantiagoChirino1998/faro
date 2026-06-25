import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary inline
cloudinary.config({
  cloud_name: 'dvereebux',
  api_key: '825257974528627',
  api_secret: 'PjDzEvj6eMYCfW-YwkCHRpNXfJo',
  secure: true
});

async function run() {
  try {
    const sampleUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
    console.log('Uploading sample image from:', sampleUrl);
    
    // Upload image
    const uploadResult = await cloudinary.uploader.upload(sampleUrl);
    
    // Print secure URL and public ID
    console.log('Secure URL:', uploadResult.secure_url);
    console.log('Public ID:', uploadResult.public_id);
    
    // Print image details
    console.log('\n--- Image Details ---');
    console.log('Width:', uploadResult.width);
    console.log('Height:', uploadResult.height);
    console.log('Format:', uploadResult.format);
    console.log('File Size (bytes):', uploadResult.bytes);
    
    // Transform the image
    // f_auto (fetch_format: 'auto'): Automatically converts the image to the most optimal format (WebP, AVIF, etc.) depending on the user's browser.
    // q_auto (quality: 'auto'): Automatically optimizes the image's quality and compression, significantly reducing the file size with minimal visual difference.
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        { fetch_format: 'auto' },
        { quality: 'auto' }
      ],
      secure: true
    });
    
    console.log('\nDone! Click link below to see optimized version of the image. Check the size and the format.');
    console.log(transformedUrl);
  } catch (error) {
    console.error('Error during Cloudinary onboarding:', error);
  }
}

run();
