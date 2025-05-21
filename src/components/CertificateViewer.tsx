import React from 'react';
import { TrainingCertification } from '../types/training';

interface Props {
  certification: TrainingCertification;
}

export default function CertificateViewer({ certification }: Props) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 border rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificat de Formation</h1>
        <p className="text-lg text-gray-600">{certification.title}</p>
      </div>

      <div className="mb-8">
        <p className="text-center text-gray-700">{certification.description}</p>
      </div>

      <div className="mb-8">
        <p className="text-center text-gray-600">
          Délivré le {new Date(certification.issued_at).toLocaleDateString()}
        </p>
        {certification.expires_at && (
          <p className="text-center text-gray-600">
            Expire le {new Date(certification.expires_at).toLocaleDateString()}
          </p>
        )}
      </div>

      {certification.metadata.signature && (
        <div className="text-center">
          <img
            src={certification.metadata.signature}
            alt="Signature"
            className="mx-auto h-16"
          />
          <p className="text-gray-600 mt-2">Signature autorisée</p>
        </div>
      )}
    </div>
  );
}
