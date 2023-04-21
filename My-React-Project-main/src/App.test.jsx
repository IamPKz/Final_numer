// Imports
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

// To Test
import BisectionMethodCalculator from './pages/Standard/Bisection';
import { IronTwoTone } from '@mui/icons-material';

// Tests
describe('Renders main page correctly', async () => {

    /**
     * Passes - clicks the button 3 times and shows the correct count
     */
    it('Should show the button count set to 3', async () => {
        // Setup
        await render(<BisectionMethodCalculator />);
        const button = await screen.queryByText('Calculate');
        
        // Pre Expectations
        expect(button).not.toBeNull();

        // Actions
        fireEvent.click(button);
        
        // Post Expectations
        const answer = await screen.getByText('Xm = 1.32476806640625');
        expect(answer).not.toBeNull();
    });

    // it('Should show the Xm = 1.41424560546875', async () => {
    //     // Setup
    //     await render(<BisectionMethodCalculator />);        

    //     // Pre Expectations
    //     // const inputFx = await screen.getByTestId('equation');
    //     // fireEvent.change(inputFx, { target: { value: 'x^2 - 2' } });
    //     // expect(inputFx.value).toBe('x^2 - 2');

    //     // const inputXL = await screen.getByTestId('xl');
    //     // fireEvent.change(inputXL, { target: { value: '1.000' } });
    //     // expect(inputXL.value).toBe('1.000');

    //     // const inputXR = await screen.getByTestId('xr');
    //     // fireEvent.change(inputXR, { target: { value: '2.000' } });
    //     // expect(inputXR.value).toBe('2.000');

    //     // const button = await screen.getByText('Calculate');
    //     // expect(button).not.toBeNull();

    //     // Actions
    //     // fireEvent.click(button);

    //     // // Post Expectations
    //     // const answer = await screen.findByText('Xm = 1.41424560546875');
    //     // expect(answer).not.toBeNull();
    // });

});