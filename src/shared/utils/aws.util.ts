import * as AWS from 'aws-sdk';

if (process.env.ENV === 'local') {
	AWS.config.credentials = new AWS.SharedIniFileCredentials({
		profile: 'portfolio',
	});
}

AWS.config.update({ region: 'ap-northeast-1' });

export const s3 = new AWS.S3({ signatureVersion: 'v4' });

export function getSignedUrl(path: string, bucketName: string) {
	const key = path.replace(/^\//, '');
	const presignedUrl = s3.getSignedUrl('getObject', {
		Bucket: bucketName,
		Key: key,
		Expires: '60 * 60 * 6',
	});
	return presignedUrl;
}

export async function listObjects(params: ListObjectsReq) {
	const res = await s3.listObjectsV2(params).promise();
	return res.Contents;
}

export interface ListObjectsReq extends AWS.S3.Types.ListObjectsV2Request {
	Bucket: string;
	Prefix?: string;
}

export interface CreateMultipartUploadReq
	extends AWS.S3.Types.CreateMultipartUploadRequest {
	Bucket: string;
	Key: string;
}

export async function createMultipartUpload(
	params: CreateMultipartUploadReq,
): Promise<string> {
	let uploadId = null;
	const res = await s3.createMultipartUpload(params).promise();
	uploadId = res.UploadId!;
	return uploadId;
}

export interface GetMultipartSignedUrlReq {
	operation: string;
	params: {
		Bucket: string;
		Key: string;
		PartNumber: number;
		UploadId: string;
		Expires: number;
	};
}

export async function getSignedUrlPromise(params: GetMultipartSignedUrlReq) {
	const preSignedUrl = await s3.getSignedUrlPromise(
		params.operation,
		params.params,
	);
	return preSignedUrl;
}

export interface CompleteMultipartUploadReq
	extends AWS.S3.Types.CompleteMultipartUploadRequest {
	Bucket: string;
	Key: string;
	UploadId: string;
	MultipartUpload: {
		Parts: {
			ETag: string;
			PartNumber: number;
		}[];
	};
}

export async function completeMultipartUpload(
	params: CompleteMultipartUploadReq,
) {
	await s3.completeMultipartUpload(params).promise();
}
