import { NextRequest, NextResponse } from 'next/server';
import { getContacts, addContact } from '@/lib/db';

export async function GET() {
  try {
    const contacts = getContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newContact = addContact(body);
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
