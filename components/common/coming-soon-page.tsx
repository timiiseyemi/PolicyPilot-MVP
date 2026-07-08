import { Container } from '@/components/common/container';
import { Card } from '@/components/ui/card';

export default function ComingSoonPage() {
  return (
    <Container>
      <Card className="flex flex-col items-center justify-center p-10 min-h-[400px]">
        <h1 className="text-4xl font-bold mb-4">🚧 Coming Soon</h1>
        <p className="text-muted-foreground text-lg">
          This feature is currently under development.
        </p>
      </Card>
    </Container>
  );
}
